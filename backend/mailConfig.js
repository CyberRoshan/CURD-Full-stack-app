const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "roshanchaurasia990@gmail.com",
      pass: "yogghbynqvuipyiy",
    },
  });

  module.exports={transporter}