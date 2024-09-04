const express = require("express")
const cors = require("cors")
const compression = require("compression")
const serverless = require("serverless-http")
const dotenv = require("dotenv")
dotenv.config()
const app = express()

app.use(cors())
app.options("*", cors())

app.use(compression())

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// // simple route
app.get("/", (req, res) => {
  res.json({ message: "surya selindo api purchase, letsgow!!" })
})

require("./app/routes/list-po-item.routes")(app)
require("./app/routes/list-po.routes")(app)
require("./app/routes/product.routes")(app)
require("./app/routes/supplier.routes")(app)
require("./app/routes/turorial.routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
