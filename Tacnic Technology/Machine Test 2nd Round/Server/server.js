const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./config/connection')
const userRouter = require('./routes/user')
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:false}))
db.connect((err)=>
{
    if(err)
    {
        console.log("Database Connection Error");
    }else{
        console.log("Database Connection Success");
    }
})
app.use('/',userRouter)
app.listen(3001,()=>console.log("Server Started on Port 3001"))