const { data_list_po_item, data_product } = require("../../models")
const cache = require("memory-cache")

exports.create = async (req, res) => {
  const listPoItem = {
    quantity: req.body.quantity,
    total_price: req.body.total_price,
    product_id: req.body.product_id,
    list_po_id: req.body.list_po_id,
  }

  try {
    const data = await data_list_po_item.create(listPoItem)
    res.send({
      message: "berhasil create list po item",
      data: data,
    })
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "some error occurred while creating the list po item",
    })
  }
}

exports.findAll = async (req, res) => {
  try {
    const cacheData = cache.get("listpoitem")
    if (cacheData) {
      res.send({
        message: "berhasil get all list po item",
        data: cacheData,
      })
    } else {
      const data = await data_list_po_item.findAll({
        include: [
          {
            model: data_product,
          },
        ],
      })
      cache.put("listpoitem", data, 10000)
      res.send({
        message: "berhasil get all list po item",
        data: data,
      })
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving list po items",
    })
  }
}

exports.update = (req, res) => {
  const id = req.body.id

  data_list_po_item
    .update(req.body, {
      where: { id: id },
    })
    .then((e) => {
      console.log(e, "ini e")
      res.send({
        message: "berhasil update",
      })
    })
    .catch((err) => {
      res.status(500).send({
        message: "error updating list po item with id=" + id,
      })
    })
}
