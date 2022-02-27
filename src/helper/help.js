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

const resTransfer = (res, result, status, message) => {
  res.status(status).json({
    status: 'Succes',
    code: status,
    data: result,
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
    subject: 'Welcome to Zwallet', // Subject line
    // text: 'Hello world?', // plain text body
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        .wrapper{
            width: 700px;
            height: 200px;
            background-color: #6379f4;
            margin: 0 auto;
            border-radius: 8px;
            margin: 3vw;
        }
        .wrapper h1{
          color: #ffffff;
          text-align: center;
        }
    </style>
    </head>
    <body>
        <div class="wrapper">
            <h1>Welcome to Zwallet App</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum ullam recusandae deserunt enim natus illo impedit neque excepturi deleniti in.</p>
            <h3>please verify your account</h3>
            <a style="color: red;" href="http://localhost:5000/users/verifikasi-main/sdfasdkfsakldfjskdfjn2ensdf">tekan verifikasi</a>
        </div>
    </body>
    </html>` // html body
  });
  console.log(info);
};

module.exports = {
  handleUrl,
  response,
  sendEmail,
  resTransfer
};
