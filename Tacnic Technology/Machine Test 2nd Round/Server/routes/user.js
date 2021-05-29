const { response } = require('express')
const express = require('express')
const router = express.Router()
const userHelper = require('../Controller/userHelper')
router.post('/login', (req, res) => {
    userHelper.loginUser(req.body.mail).then((response) => {
        res.send({ login: true, Mail: response })
    }).catch(() => {
        res.send({ login: false })
    })
})
router.post('/signup', (req, res) => {
    userHelper.signupUser(req.body.mail).then((response) => {
        res.send({ user: true, Mail: response.Mail })
    }).catch(() => {
        res.send({ user: false })
    })
})
router.post('/getList', (req, res) => {
    userHelper.getTodoList(req.body.Mail).then((response) => {
        res.send({ List: response })
    })
})
router.post('/addToList', (req, res) => {
    userHelper.addToList(req.body.Mail, req.body.list).then(() => {
        res.send({ add: true })
    })
})
router.post('/deleteItem', (req, res) => {
    userHelper.deleteItem(req.body.Mail, req.body.listId).then(() => {
        res.send({ delete: true })
    })
})
module.exports = router