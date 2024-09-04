const { data_product } = require("../../models")
const cache = require("memory-cache")

exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      status_code: 402,
      message: "Content tidak boleh kosong",
    })
    return // Ensure to return to prevent further execution
  }

  const product = {
    name: req.body.name,
    alias: req.body.alias,
    stock: req.body.stock,
    uom: req.body.uom,
    product_group_id: req.body.product_group_id,
    product_group_name: req.body.product_group_name,
    product_brand_id: req.body.product_brand_id,
    product_brand_name: req.body.product_brand_name,
    product_type_id: req.body.product_type_id,
    product_type_name: req.body.product_type_name,
    product_variant_id: req.body.product_variant_id,
    product_variant_name: req.body.product_variant_name,
    price: req.body.price,
    supplier_id: req.body.supplier_id,
  }

  try {
    const data = await data_product.create(product)
    res.send({
      status_code: 201,
      message: "berhasil create data product",
      data: data,
    })
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      message: err.message || "Some error occurred while creating the product",
    })
  }
}

// Retrieve all products from the database.
exports.findAll = async (req, res) => {
  try {
    const cachedData = cache.get("product")
    if (cachedData) {
      res.send({
        status_code: 201,
        message: "berhasil get all data product",
        data: cachedData,
      })
    } else {
      const data = await data_product.findAll()
      cache.put("product", data, 10000)
      res.send({
        status_code: 201,
        message: "berhasil get all data product",
        data: data,
      })
    }
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      message: err.message || "Some error occurred while retrieving products.",
    })
  }
}

exports.findAllBySupplierId = async (req, res) => {
  try {
    const data = await data_product.findAll({
      where: {
        supplier_id: req.params.id,
      },
    })
    res.send({
      status_code: 201,
      message: "berhasil get all product dengan supplier id " + req.params.id,
      data: data,
    })
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      message:
        err.message ||
        "Some error occurred while retrieving products by supplier.",
    })
  }
}
