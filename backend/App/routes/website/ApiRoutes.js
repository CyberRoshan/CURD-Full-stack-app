const express=require("express")
const { insertStudent, viewStudent, deleteStudent } = require("../../controller/ApiController")

const apiRoutes=express.Router()

apiRoutes.post("/insert-student",insertStudent)
apiRoutes.get("/view-student",viewStudent)
apiRoutes.delete("/delete-student/:id",deleteStudent)

module.exports={apiRoutes}