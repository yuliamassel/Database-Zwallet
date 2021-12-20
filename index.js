require('dotenv').config()
const express = require('express')
const walletController = require('./src/controllers/wallet')
const walletRoute = require('./src/routes/forWallet')
const commonMiddle = require('./src/middleware/middle')
const helperUrl = require('./src/helper/help')  //kemungkinan masalah error handlingnya
const usersController = require('./src/controllers/users')
const usersRoute = require('./src/routes/forUsers')
const transacRoute = require('./src/routes/forDeal')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(commonMiddle.myConsole)
app.use(morgan('dev'))






// ALL ROUTE
app.use('/users', usersRoute)
app.use('/wallet',walletRoute)
app.use('/transaction',transacRoute)

app.use(helperUrl.handleUrl)
//error handling
app.use((err,req,res,next)=>{
    const codeStatus = err.status 
    const message = err.message 
    res.status(codeStatus)
    res.json({
        message : message
    })
})

const port = 1000
app.listen(port,()=>{
    console.log(`server mulai dari ${port}`)
})
