const express=require("express")
const cors=require("cors")
const { mainRoute } = require("./App/mainRoutes")
const app=express()

app.use(express.json())
app.use(cors())
app.use(mainRoute)
app.listen("8000")

// localhost:8000/website/insert-student