const Pool = require('pg').Pool
const pool = new Pool({
    user:'hari',
    host:"localhost",
    port:"5432",
    database:"sample",
    password:"hari"
})
module.exports=pool