const {
  data_list_po,
  data_list_po_item,
  data_product,
} = require("../../models")
const cache = require("memory-cache")

exports.create = async (req, res) => {
  try {
    const { name, preparedBy, data } = req.body

    // Create the main PO
    const newPO = await data_list_po.create({
      name,
      prepared_by: preparedBy,
    })

    // Prepare data for bulk creation of PO items
    const poItemsData = data.map((item) => ({
      list_po_id: newPO.id,
      quantity: item.quantity,
      total_price: item.total_price,
      product_id: item.id,
    }))

    // Bulk create PO items
    const createdItems = await data_list_po_item.bulkCreate(poItemsData)

    // Fetch complete data including associated products
    const completeData = await data_list_po.findOne({
      where: { id: newPO.id },
      include: [
        {
          model: data_list_po_item,
          include: [
            {
              model: data_product,
              attributes: [
                "id",
                "name",
                "alias",
                "stock",
                "uom",
                "product_group_id",
                "product_group_name",
                "product_brand_id",
                "product_brand_name",
                "product_type_id",
                "product_type_name",
                "product_variant_id",
                "product_variant_name",
                "price",
                "supplier_id",
              ],
            },
          ],
        },
      ],
    })

    // Send success response
    res.status(201).json({
      message: "Successfully created list PO",
      data: completeData,
    })
  } catch (error) {
    console.error("Error in create function:", error)
    res.status(500).json({
      message: "An error occurred while creating the list PO",
      error: error.message,
    })
  }
}

exports.handleApprove = async (req, res) => {
  try {
    const { id, data } = req.body

    // Update main PO
    await data_list_po.update({ approved: 1 }, { where: { id } })

    // Update PO items
    if (data) {
      const updatePromises = Object.entries(data).map(
        ([itemId, approvalStatus]) =>
          data_list_po_item.update(
            { approved: approvalStatus },
            { where: { id: itemId } }
          )
      )
      await Promise.all(updatePromises)
    }

    // Fetch updated data
    const updatedData = await data_list_po.findOne({
      where: { id },
      include: [
        {
          model: data_list_po_item,
          where: { approved: 1 },
          required: false,
          include: [{ model: data_product }],
        },
      ],
    })

    if (!updatedData) {
      return res.status(404).json({ message: "PO not found after update" })
    }

    res.status(200).json({
      message: "Successfully approved list PO",
      data: updatedData,
    })
  } catch (error) {
    console.error("Error in handleApprove:", error)
    res.status(500).json({
      message: "An error occurred while processing the approval",
      error: error.message,
    })
  }
}

exports.findAll = async (req, res) => {
  try {
    const cachedData = cache.get("listpo")
    if (cachedData) {
      res.send({
        message: "berhasil get all list po",
        data: cachedData,
      })
    } else {
      const data = await data_list_po.findAll({
        where: {
          approved: 0,
        },
        include: [
          {
            model: data_list_po_item,
            include: [
              {
                model: data_product,
              },
            ],
          },
        ],
      })
      cache.put("listpo", data, 10000)
      res.send({
        message: "berhasil get all list po",
        data: data,
      })
    }
  } catch (err) {
    res.send({
      message: "Some error occurred while retrieving list po",
    })
  }
}

exports.approved = async (req, res) => {
  try {
    const cachedData = cache.get("listpoapproved")
    if (cachedData) {
      res.send({
        message: "berhasil get all approved list po",
        data: cachedData,
      })
    } else {
      const data = await data_list_po.findAll({
        where: {
          approved: 1,
        },
        include: [
          {
            model: data_list_po_item,
            where: {
              approved: 1,
            },
            required: false,
            include: [
              {
                model: data_product,
              },
            ],
          },
        ],
      })
      cache.put("listpoapproved", data, 10000)
      res.send({
        message: "berhasil get all list po",
        data: data,
      })
    }
  } catch (err) {
    res.send({
      message: "Some error occurred while retrieving list po",
    })
  }
}
