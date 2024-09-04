module.exports = (app) => {
  const listPo = require("../controllers/list-po.controller")

  var router = require("express").Router()

  router.post("/", listPo.create)
  router.post("/approval", listPo.handleApprove)
  router.get("/", listPo.findAll)
  router.get("/approved", listPo.approved)

  app.use("/api/list-po", router)
}
