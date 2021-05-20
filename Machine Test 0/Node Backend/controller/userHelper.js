var db = require('../config/connection')
var collection = require('../config/collection')
const { response } = require('express')
const { ObjectID } = require('bson')
module.exports = {
    login: (data) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.NOTE_COLLECTION).findOne({ _id: ObjectID('609ad070ac69ae2a26b7378a') })
            if (user.User == data.User && user.Password == data.Password) {
                resolve("success")
            } else {
                reject("fail")
            }
        })
    },
    createNewNote: (note) => {
        return new Promise((resolve, reject) => {
            let data = {
                Note: note
            }
            db.get().collection(collection.NOTE_COLLECTION).insertOne(data).then((response) => {
                console.log(response.ops[0]);
                resolve(response.ops[0])
            })
        })
    },
    getAllNotes: () => {
        return new Promise(async (resolve, reject) => {
            let notes = ''
            notes = await db.get().collection(collection.NOTE_COLLECTION).find({ _id: { $ne: ObjectID('609ad070ac69ae2a26b7378a') } }).toArray()
            resolve(notes)
        })
    },
    userVerify: (password) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.NOTE_COLLECTION).findOne({ _id: ObjectID('609ad070ac69ae2a26b7378a') })
            if (user.Password == password) {
                resolve()
            } else {
                reject()
            }
        })
    },
    editNote: (password, id) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.NOTE_COLLECTION).findOne({ _id: ObjectID('609ad070ac69ae2a26b7378a') })
            if (user.Password == password) {
                let note = await db.get().collection(collection.NOTE_COLLECTION).findOne({ _id: ObjectID(id) })
                resolve(note)
            } else {
                reject()
            }
        })
    },
    updateNote: (id, note) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.NOTE_COLLECTION).updateOne({ _id: ObjectID(id) }, {
                $set: {
                    Note: note
                }
            }).then(() => {
                resolve()
            })
        })
    },
    deleteNote: (password, id) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.NOTE_COLLECTION).findOne({ _id: ObjectID('609ad070ac69ae2a26b7378a') })
            if (user.Password == password) {
                db.get().collection(collection.NOTE_COLLECTION).removeOne({ _id: ObjectID(id) }).then(() => {
                    resolve()
                })
            } else {
                reject()
            }

        })
    }
}