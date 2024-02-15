const PORT = 8000
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db1 = require('./database/db1')
const db2 = require('./database/db2')
const Transactions = require('./models/transactions')
const Users = require('./models/user')
const mongo = require('mongodb')

db1()
db2()
const app = express()


app.use(bodyParser.json())
app.use(cors())

app.post("/add-user", async (req, res) => {
    try {
        const user = await Users.create({
            "name": req.body.name,
            "email": req.body.email,
            "username": req.body.username,
            "password": req.body.password,
        })
        res.status(200).json({ "msg": "user added" })
    } catch (err) {
        if(err.code === 11000 && err.keyPattern.email === 1){
            console.log("Email already exists")
            res.status(401).json({"error": "Email already exists"})
        }
        else if(err.code === 11000 && err.keyPattern.username === 1){
            console.log("Username already exists")
            res.status(402).json({"error": "Username already exists"})
        }
        else{
            console.error("Error:", err);
            res.status(500).json({ "error": "Internal Server Error" });
        }
    }
})

app.post("/get-user", async (req, res) => {
    try {
        const user = await Users.find()
        res.status(200).json({ user })
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ "error": "Internal Server Error" });
    }
})

app.post("/add-transaction", async (req, res) => {
    try {
        const transaction = await Transactions.create({
            "category": req.body.category,
            "amount": req.body.amount,
            "description": req.body.description,
            "date": req.body.date,
            "title": req.body.title,
            "username": req.body.username,
        })
        res.status(200).json({ "msg": "transaction added" })
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ "error": "Internal Server Error" });
    }
})

app.post("/get-transactions", async (req, res) => {
    try {
        const transaction = await Transactions.find()
        res.status(200).json({ transaction })
    } catch (err) {
        console.error("Error:", error);
        res.status(500).json({ "error": "Internal Server Error" });
    }
})

// app.post("/update-todo", async (req, res) => {
//     try {
//         const updatedTodo = await Todo.findOneAndUpdate(
//             { "todo": req.body.oldTodo }, 
//             { $set: { "todo": req.body.newTodo } },
//         );
//         if (updatedTodo) {
//             res.status(200).json({ "msg": "Updated", "todo": updatedTodo });
//         } else {
//             res.status(404).json({ "error": "Todo not found" });
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ "error": "Internal Server Error" });
//     }
// });

app.post("/remove-transaction/:_id", async (req, res) => {
    try {
        const transaction = await Transactions.deleteOne({
            "_id": new mongo.ObjectId(req.params._id),
        });
        res.status(200).json({ "msg": "Deleted", transaction });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ "error": "Internal Server Error" });
    }
})


app.listen(PORT, () => {
    console.log("Server listening on " + PORT)
})