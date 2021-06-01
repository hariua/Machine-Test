var db = require('../config/connection')
var collection = require('../config/collection')
const pg = require('../config/postgresConnection')
const moment = require('moment')
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
    createNewNote: (dat) => {
        return new Promise((resolve, reject) => {
            let date = new Date()
            let id = moment(date).format('YYYYMMDDhhmmss')
            let data = {
                _id: id,
                Name: dat.Name,
                Age: dat.Age,
                Place: dat.Place
            }
            db.get().collection(collection.NOTE_COLLECTION).insertOne(data).then((response) => {
                pg.query("SELECT to_regclass($1)", [collection.NOTE_COLLECTION], (err, dat) => {
                    if (!err) {
                        if (dat.rows[0].to_regclass != null) {
                            pg.query('INSERT INTO notes (_id,"Name","Age","Place") VALUES($1,$2,$3,$4)', [data._id, data.Name, data.Age, data.Place], (err, data) => {
                                if (!err) {
                                    resolve()
                                }else{
                                    throw err
                                }
                            })
                        } else {
                            pg.query('CREATE TABLE notes (_id VARCHAR(20) PRIMARY KEY,"Name" VARCHAR(50),"Age" INT, "Place" VARCHAR(50))', (err, dat) => {
                                if (!err) {
                                    pg.query('INSERT INTO notes (_id,"Name","Age","Place") VALUES($1,$2,$3,$4)', [data._id, data.Name, data.Age, data.Place], (err, data) => {
                                        if (!err) {
                                            resolve()
                                        }else{
                                            throw err
                                        }
                                    })
                                }else{
                                    throw err
                                }
                            })
                        }
                    }
                })

            })

        })
    },
    getAllNotes: () => {
        return new Promise(async (resolve, reject) => {
            let state={}
            let mongo = await db.get().collection(collection.NOTE_COLLECTION).find().toArray()
            pg.query('SELECT * FROM notes', (err, data) => {
                if (!err) {
                    state.mongo=mongo
                    state.sql=data.rows
                    resolve(state)
                }
            })

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
    editNote: ( id) => {
        return new Promise(async (resolve, reject) => {
            let note = await db.get().collection(collection.NOTE_COLLECTION).findOne({ _id:id })
            resolve(note)
        })
    },
    updateNote: (val) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.NOTE_COLLECTION).updateOne({ _id: val._id }, {
                $set: {
                    Name:val.Name,
                    Age:val.Age,
                    Place:val.Place
                }
            }).then(() => {
                pg.query('UPDATE notes SET "Name"=$1,"Age"=$2,"Place"=$3 WHERE _id=$4', [val.Name,val.Age,val.Place,val._id], (err, data) => {
                    if (!err) {
                        resolve()
                    }else{
                        throw err
                    }
                })
            })
           
        })
    },
    deleteNote: (id) => {
        return new Promise(async (resolve, reject) => {
             db.get().collection(collection.NOTE_COLLECTION).removeOne({ _id:id }).then(() => {
                pg.query('DELETE FROM notes WHERE _id=($1)', [id], (err, data) => {
                    if (!err) {
                        resolve()
                    }
                })
                })
        })
    }
}