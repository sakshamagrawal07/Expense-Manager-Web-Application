const mongoose = require('mongoose')

const Connection = async ()=>{
    const url = "mongodb://localhost:27017/expense-manager"

    try{
        await mongoose.connect(url,{useNewUrlParser : true})
        console.log("Users Database Connected")
    }catch(err){
        console.log("Error connecting to Database")
    }
}

module.exports = Connection