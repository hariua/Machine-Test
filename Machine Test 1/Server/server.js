const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const db = require('./config/connection')
const userRouter = require('./routes/user')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname+"public")))
db.connect((err)=>
{
    if(err){
        console.log("Database connection error");
    }else{
        console.log("Database connection success")
    }
})
app.use('/',userRouter)
app.listen(3001,()=>{console.log("Server on Port 3001");})
