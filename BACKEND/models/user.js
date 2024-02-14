const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    username : {
        type : String,
        require : true,
        unique: true
    },
    password : {
        type : String,
        require : true
    },
})

const user = mongoose.model("user",userSchema)
module.exports = user