const db = require('../config/connection')
const collection = require('../config/collection')
const moment = require('moment')
module.exports = {
    //function for adding a new user to db afterverying whether that user already exists or not
    signupUser: (mailId) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.TODO_COLLECTION).findOne({ Mail: mailId })
            if (!user) {
                let data = {
                    Mail: mailId,
                    List: []
                }
                db.get().collection(collection.TODO_COLLECTION).insertOne(data).then((response) => {
                    resolve(response.ops[0])
                })
            } else {
                reject()
            }
        })
    },
    //function for verying and logging the user to application
    loginUser: (mailId) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.TODO_COLLECTION).findOne({ Mail: mailId })
            if (user) {
                resolve(user.Mail)
            } else {
                reject()
            }
        })
    },
    getTodoList: (mailId) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.TODO_COLLECTION).findOne({ Mail: mailId })
            if (user) {
                resolve(user.List)
            } else {
                reject()
            }
        })
    },
    //adding item to list in db of the particular user(mailID)
    addToList: (mailId, text) => {
        return new Promise((resolve, reject) => {
            let date = new Date()
            let id = moment(date).format('YYYYMMDDhhmmss')
            let data = {
                _id: id,
                item: text
            }
            db.get().collection(collection.TODO_COLLECTION).updateOne({ Mail: mailId }, {
                $push: {
                    List: data
                }
            }).then(() => {
                resolve()
            })
        })
    },
    //deletes a particular item from the list of a particular person
    deleteItem: (mailId, listId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.TODO_COLLECTION).updateOne({ Mail: mailId }, {
                $pull: {
                    List: { _id: listId }
                }
            }).then(() => {
                resolve()
            })
        })
    }
}