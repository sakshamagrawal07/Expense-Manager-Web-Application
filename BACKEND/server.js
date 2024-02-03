const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require('./database/db')
const Transactions = require('./models/transactions')

db()
const app = express()


app.use(bodyParser.json())
app.use(cors())

app.post("/add-transaction", async (req, res) => {
    try {
        let transaction = await Transactions.create({
            "category": req.body.category,
            "amount": req.body.amount,
            "description": req.body.description,
            "date": req.body.data,
            "title": req.body.title
        })
        res.status(200).json({ "msg": "transaction added" })
    } catch (err) {
        console.error("Error:", error);
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

app.post("/remove-transaction", async (req, res) => {
    try {
        const transaction = await Transactions.findOneAndDelete({
            "category": req.body.category,
            "amount": req.body.amount,
            "description": req.body.description,
            "date": req.body.data,
            "title": req.body.title
        });
        res.status(200).json({ "msg": "Deleted", transaction });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ "error": "Internal Server Error" });
    }

})

const PORT = 8000
app.listen(PORT, () => {
    console.log("Server listening on " + PORT)
})