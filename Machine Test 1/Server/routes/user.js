const express = require('express')
const router = express.Router()
const userHelper = require('../controller/userHelper')
router.post('/addTimeSlot',(req,res)=>
{
    console.log(req.body);
    userHelper.addTimeSlot(req.body.startTime,req.body.endTime,req.body.day).then(()=>
    {
        res.send({slotAdded:true})
    }).catch(()=>
    {
        res.send({slotAdded:false})
    })
})
module.exports=router
