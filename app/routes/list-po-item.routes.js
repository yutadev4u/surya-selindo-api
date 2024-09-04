module.exports = (app) => {
  const listPoItem = require("../controllers/list-po-item.controller")

  var router = require("express").Router()

  router.post("/", listPoItem.create)

  router.get("/", listPoItem.findAll)

  router.put("/", listPoItem.update)

  app.use("/api/list-po-item", router)
}
