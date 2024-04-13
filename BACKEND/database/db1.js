const mongoose = require('mongoose')

const Connection = async ()=>{
    const url = process.env.MONGO_DB_URI

    try{
        await mongoose.connect(url,{useNewUrlParser : true})
        console.log("Database Connected")
    }catch(err){
        console.log("Error connecting to Transactions Database")
    }
}

module.exports = Connection