const express=require('express')
const mongoose=require('mongoose')
const app=express()
const useroute=require('./route/UserRoute')
const notificationroute=require('./route/EventRoute')
const places=require('./route/SafePlaceRoute')
const cors = require('cors')
const emergency=require('./route/EmergencyRoute')
app.use(express.json())
mongoose.connect('').then(()=>
{
    console.log("successfully connected to db")
})
.catch((error)=>
{
    console.log(error)
})
app.use(cors())
app.use('/user',useroute)
app.use('/event',notificationroute)
app.use('/place',places)
app.use('/emergency',emergency)
app.use('/',(req,res,next)=>
{
    res.send("hey!!!")
})
app.listen(5000,()=>
{
    console.log("listening at port 5000")
})
