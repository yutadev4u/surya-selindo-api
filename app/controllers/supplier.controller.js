const { data_supplier, data_product } = require("../../models")
const cache = require("memory-cache")

exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    })
    return
  }

  const supplier = {
    name: req.body.name,
    address: req.body.address,
    contact: req.body.contact,
  }

  try {
    const data = await data_supplier.create(supplier)
    res.send({
      message: "berhasil create supplier",
      data: data,
    })
  } catch (err) {
    res.status(500).send({
      message: err.errors || "Some error occurred while creating the supplier.",
    })
  }
}

exports.findAll = async (req, res) => {
  try {
    const cachedData = cache.get("supplier")
    if (cachedData) {
      res.send({
        message: "berhasil get all supplier",
        data: cachedData,
      })
    } else {
      const data = await data_supplier.findAll()
      cache.put("supplier", data, 10000)
      res.send({
        message: "berhasil get all supplier",
        data: data,
      })
    }
  } catch (err) {
    console.log(err, "ini err supplier")
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving suppliers.",
    })
  }
}

exports.findAllWithProduct = async (req, res) => {
  try {
    const cachedData = cache.get("supplierwithproduct")
    if (cachedData) {
      res.send({
        message: "berhasil get all supplier",
        data: cachedData,
      })
    } else {
      const data = await data_supplier.findAll({
        include: [
          {
            model: data_product,
          },
        ],
      })
      cache.put("supplierwithproduct", data, 10000)
      res.send({
        message: "berhasil get all supplier with product",
        data: data,
      })
    }
  } catch (err) {
    console.log(err, "ini err supplier")
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving suppliers.",
    })
  }
}
