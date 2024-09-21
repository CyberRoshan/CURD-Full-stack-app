const express=require("express")
const { apiRoutes } = require("./routes/website/ApiRoutes")
const mainRoute=express.Router()

mainRoute.use("/website",apiRoutes)

module.exports={mainRoute}