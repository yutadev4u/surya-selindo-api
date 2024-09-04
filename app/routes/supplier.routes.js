module.exports = (app) => {
  const supplier = require("../controllers/supplier.controller")

  var router = require("express").Router()

  router.post("/", supplier.create)

  router.get("/", supplier.findAll)
  router.get("/include-product", supplier.findAllWithProduct)

  app.use("/api/supplier", router)
}
