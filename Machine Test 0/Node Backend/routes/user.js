const { response } = require('express')
var express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
var userHelper = require('../controller/userHelper')
const userAuthentication = (req, res, next) => {
    let token = req.body.jwt
    if (token) {
        jwt.verify(token, "1234Secret", (err, user) => {
            if (err) {
                console.log("jwt token corrupted");
            } else {
                console.log("User Authenticated");
                next()
            }
        })
    } else {
        console.log("jwt token null");
    }
}
// router.get('/', (req, res) => {
//     res.send('Welcome to Harikrishnan')
// })
// router.post('/login', (req, res) => {
//     userHelper.login(req.body).then(async()=>
//     {
//         let token = await jwt.sign(req.body, "1234Secret",{expiresIn:"1h"})
//         res.send({ login: true, jwt: token })
//     }).catch(()=>
//     {
//         res.send({ login: false })
//     })
// })
router.post('/addNewNote',(req,res)=>
{
    userHelper.createNewNote(req.body).then(()=>
    {
        res.send({note:true})
    })
})
router.get('/getAllNotes',(req,res)=>
{
    userHelper.getAllNotes().then((response)=>
    {
        res.send(response)
    })
}),
router.post('/userAuth',(req,res)=>
{
    userHelper.userVerify(req.body.password).then(()=>
    {
        res.send({verified:true})
    }).catch(()=>
    {
        res.send({verified:false})
    })
})
router.post('/editNote',(req,res)=>
{
    userHelper.editNote(req.body.id).then((note)=>
    {
        res.send({note:note})
    })
}),
router.post('/updateNote',(req,res)=>
{
    userHelper.updateNote(req.body).then(()=>
    {
        res.send("updated")
    })
})
router.post('/deleteNote',(req,res)=>
{
    userHelper.deleteNote(req.body.id).then(()=>
    {
        res.send("deleted")
    })
})
module.exports = router