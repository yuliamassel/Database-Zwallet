require('dotenv').config();
const express = require('express');
const walletRoute = require('./src/routes/forWallet');
const commonMiddle = require('./src/middleware/middle');
const helperUrl = require('./src/helper/help'); // kemungkinan masalah error handlingnya
const usersRoute = require('./src/routes/forUsers');
const transacRoute = require('./src/routes/forDeal');
const morgan = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 2000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(commonMiddle.myConsole);
app.use(morgan('dev'));

// ALL ROUTE
app.use('/users', usersRoute);
app.use('/wallet', walletRoute);
app.use('/transaction', transacRoute);

app.use('/file', express.static('./uploads'));

app.use(helperUrl.handleUrl);
// error handling
app.use((err, req, res, next) => {
  const codeStatus = err.status;
  const message = err.message;
  res.status(codeStatus);
  res.json({
    message: message
  });
});

app.listen(PORT, () => {
  console.log(`server mulai dari ${PORT}`);
});
