const mongoClient = require('mongodb').MongoClient
var state={
    dbName:""
}
module.exports={
    connect:(done)=>{
        const dbName="MachineTest"
        const url="mongodb://localhost:27017"
        mongoClient.connect(url,(err,data)=>
        {
            if(err)
            {
                return done(err)
            }else{
                state.dbName=data.db(dbName)
                done()
            }
        })
    },
    get:()=>
    {
        return state.dbName
    }
}