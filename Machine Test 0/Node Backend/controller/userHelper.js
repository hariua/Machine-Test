var db = require('../config/connection')
var collection = require('../config/collection')
const pg = require('../config/postgresConnection')
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
            // db.get().collection(collection.NOTE_COLLECTION).insertOne(data).then((response) => {
            //     console.log(response.ops[0]);
                
            //     resolve(response.ops[0])
            // })
            pg.query("SELECT to_regclass($1)", [collection.NOTE_COLLECTION], (err, data) => {
                if (!err) {
                    if (data.rows[0].to_regclass != null) {
                        pg.query('INSERT INTO notes (note) VALUES($1)', [note], (err, data) => {
                            resolve()
                        })
                    } else {
                        pg.query('CREATE TABLE notes (_id SERIAL PRIMARY KEY,note VARCHAR(50))', (err, data) => {
                            if (!err) {
                                pg.query('INSERT INTO notes (note) VALUES($1)', [note], (err, data) => {
                                    resolve()
                                })
                            }
                        })
                    }
                }
            })
        })
    },
    getAllNotes: () => {
        return new Promise(async (resolve, reject) => {
            let notes = ''
            // notes = await db.get().collection(collection.NOTE_COLLECTION).find({ _id: { $ne: ObjectID('609ad070ac69ae2a26b7378a') } }).toArray()
            pg.query('SELECT * FROM notes',(err,data)=>
            {
                if(!err)
                {
                    resolve(data.rows)
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
    editNote: (password, id) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.NOTE_COLLECTION).findOne({ _id: ObjectID('609ad070ac69ae2a26b7378a') })
            if (user.Password == password) {
                //let note = await db.get().collection(collection.NOTE_COLLECTION).findOne({ _id: ObjectID(id) })
                pg.query('SELECT * FROM notes WHERE _id=($1)',[id],(err,data)=>
                {
                    if(!err)
                    {
                        console.log(data.rows[0]);
                        resolve(data.rows[0])
                    }
                })
            } else {
                reject()
            }
        })
    },
    updateNote: (id, note) => {
        return new Promise((resolve, reject) => {
            // db.get().collection(collection.NOTE_COLLECTION).updateOne({ _id: ObjectID(id) }, {
            //     $set: {
            //         Note: note
            //     }
            // }).then(() => {
            //     resolve()
            // })
            pg.query('UPDATE notes SET note=($1) WHERE _id=($2)',[note,id],(err,data)=>
            {
                if(!err)
                {
                    resolve()
                }
            })
        })
    },
    deleteNote: (password, id) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.NOTE_COLLECTION).findOne({ _id: ObjectID('609ad070ac69ae2a26b7378a') })
            if (user.Password == password) {
                // db.get().collection(collection.NOTE_COLLECTION).removeOne({ _id: ObjectID(id) }).then(() => {
                //     resolve()
                // })
                pg.query('DELETE FROM notes WHERE _id=($1)',[id],(err,data)=>
                {
                    if(!err)
                    {
                        resolve()
                    }
                })
            } else {
                reject()
            }

        })
    }
}