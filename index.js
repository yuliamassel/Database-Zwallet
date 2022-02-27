require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 2000;
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const walletRoute = require('./src/routes/forWallet');
const commonMiddle = require('./src/middleware/middle');
const helperUrl = require('./src/helper/help'); // kemungkinan masalah error handlingnya
const usersRoute = require('./src/routes/forUsers');
const transacRoute = require('./src/routes/forDeal');

const { Server } = require('socket.io');

const io = new Server({
  cors: {
    origin: 'http://localhost:3000'
  }
});

io.on('connection', (socket) => {
  console.log('USER ONLINE');
  socket.on('disconnect', () => {
    console.log('USER OFFLINE');
  });
});

io.listen(server);

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
  const codeStatus = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(codeStatus);
  res.json({
    message: message
  });
});

server.listen(PORT, () => {
  console.log(`server starting on port ${PORT}`);
});

module.exports = app;

// // import modules
// require('dotenv').config();
// const express = require('express');
// const morgan = require('morgan');
// const PORT = process.env.PORT || 4001;
// const cors = require('cors');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);

// const handleURL = require('./src/helpers/common')
// const handleResponse = require('./src/helpers/common')
// const route = require('./src/routes')

// // import modules from socket.io
// const {Server} = require('socket.io');

// const io = new Server({
//     cors: {
//         origin: 'http://localhost:3000'
//     }
// });

// io.on("connection", (socket) => {
//     console.log('some user ONLINE')
//     socket.on('disconnect', ()=> {
//         console.log('some user OFFLINE')
//     })
// })

// io.listen(server);

// // using app method
// app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'));

// // app.use(bodyParser.json());
// // app.use((bodyParser.urlencoded({extended: false, limit: '2gb'})));
// // routes
// app.use('/v1', route)
// app.use('/file', express.static('./uploads'));

// app.use(handleURL.urlNotFound);
// app.use((err, req, res, next) => {
//     const statusCode = err.status || 500;
//     const message = err.message || 'Internal Server Error';
//     handleResponse.response(res, null, statusCode, message);
//     console.log(err);
// })

// server.listen(PORT, () => {
//     console.log(`server starting on port ${PORT}`);
// });

// module.exports = app;
