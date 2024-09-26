const { ObjectId } = require("mongodb");
const { dbConnection } = require("../../DBconnection");
const { transporter } = require("../../mailConfig");

let insertStudent = async (req, res) => {
  let { uname, uemail, upassword, uphone } = req.body;
  let userData = {
    uname,
    uemail,
    upassword,
    uphone,
  };
  try {
    let db = await dbConnection();
    let userManager = await db.collection("userManager");
    let finalRes = await userManager.insertOne(userData);
    const info = await transporter.sendMail({
      from: '"Task Manager" <roshanchaurasia990@gmail.com>', // sender address
      to: `${uemail}, roshanchaurasia990@gmail.com`, // list of receivers
      subject: "Thank You for Logging In! 😀", // Subject line
      text: `Hello ${uname},\n\nThank you for logging into Task Manager!\nWe hope you have a productive session managing your tasks. Remember, staying organized is the key to success!\n\nIf this wasn’t you, please secure your account by resetting your password immediately.\n\nBest regards,\nThe Task Manager Team, Roshan`, // plain text body
      html: `
         <p>Hello <strong>${uname}</strong>,</p>
    <p>Thank you for logging into <strong>Task Manager</strong>!</p>
    <p>We hope you have a productive session managing your tasks. Remember, staying organized is the key to success!</p>
    <br>
    <p>Best regards,<br>The Task Manager Team</p>
        `, // html body
    });
    let resObj = {
      status: 1,
      message: finalRes,
    };
    res.send(resObj);
  } catch (error) {
    res.send(error);
  }
};

let viewStudent = async (req, res) => {
  let db = await dbConnection();
  let userManager = await db.collection("userManager");
  let finalRes = await userManager.find().toArray();
  let resObj = {
    status: 1,
    dataList: finalRes,
  };
  res.send(resObj);
};

let deleteStudent = async (req, res) => {
  let ID = req.params.id;
  let db = await dbConnection();
  let userManager = await db.collection("userManager");
  let deleteRes = await userManager.deleteOne({ _id: new ObjectId(ID) });
  let resObj = {
    status: 1,
    message: deleteRes,
  };
  res.send(resObj);
};

module.exports = { insertStudent, viewStudent, deleteStudent };
