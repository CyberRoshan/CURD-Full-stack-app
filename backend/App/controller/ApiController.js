const { ObjectId } = require("mongodb")
const { dbConnection } = require("../../DBconnection")

let insertStudent=async (req,res)=>{
    let {uname,uemail,upassword,uphone}=req.body
    let userData={
        uname,
        uemail,
        upassword,
        uphone
    }
    try{
    let db=await dbConnection()
    let userManager=await db.collection("userManager")
    let finalRes=await userManager.insertOne(userData)
    let resObj={
        status: 1,
        message: finalRes
    }
    res.send(resObj)
    }
    catch(error){
        res.send(error)
    }
}

let viewStudent=async (req,res)=>{
    let db=await dbConnection()
    let userManager=await db.collection("userManager")
    let finalRes=await userManager.find().toArray()
    let resObj={
        status:1,
        dataList: finalRes
    }
    res.send(resObj)
}

let deleteStudent=async (req,res)=>{
    let ID=req.params.id
    let db=await dbConnection()
    let userManager=await db.collection("userManager")
    let deleteRes=await userManager.deleteOne({_id: new ObjectId(ID)})
    let resObj={
        status:1,
        message: deleteRes
    }
    res.send(resObj)
}

module.exports={insertStudent, viewStudent, deleteStudent}