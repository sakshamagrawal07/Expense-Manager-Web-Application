const mongoose = require("mongoose")

const TransactionSchema = new mongoose.Schema({
    category : {
        type : String,
        require : true
    },
    amount : {
        type : Number,
        require : true
    },
    description : {
        type : String,
        require : true
    },
    date : {
        type : Date,
        require : true
    },
    title : {
        type : String,
        require : true
    }
})

const Transactions = mongoose.model("transactions",TransactionSchema)
module.exports = Transactions