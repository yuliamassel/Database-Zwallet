const nodemailer = require('nodemailer');

const handleUrl = (req, res, next) => {
  res.status(404);
  res.json({
    message: 'url not found'
  });
};

const response = (res, result, status, pagination, message) => {
  res.status(status).json({
    status: 'Succes',
    code: status,
    data: result,
    pagination: pagination,
    message: message || ''
  });
};

const sendEmail = async (toEmail) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'masselyulia75@gmail.com', // generated ethereal user
      pass: 'password098' // generated ethereal password
    }
  });
  const info = await transporter.sendMail({
    from: '"Zwallet 👻" <masselyulia75@gmail.com>', // sender address
    to: toEmail, // list of receivers
    subject: 'Hello ✔', // Subject line
    // text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
  });
  console.log(info);
};

module.exports = {
  handleUrl,
  response,
  sendEmail
};
