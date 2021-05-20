var express = require('express')
var path = require('path')
var cors = require('cors')
var app = express() 
var userRouter = require('./routes/user')
var db = require('./config/connection')
app.listen(3001,()=>{
    console.log("Server Connected to Port 3001") 
})
app.use(cors()) 
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public'))); 
db.connect((err)=>{
    if(err){
        console.log("Database Connection Error");
    }else{
        console.log("Database Connection Success");
    }
})
app.use('/',userRouter)
