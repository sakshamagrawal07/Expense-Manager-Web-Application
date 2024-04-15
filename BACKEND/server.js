const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db1 = require('./database/db1')
const Transactions = require('./models/transactions')
const Users = require('./models/user')
const mongo = require('mongodb')
const bcrypt = require('bcrypt');
const saltRounds = 10;

require("dotenv").config()

db1()
const app = express()

var visits = 0

app.use(bodyParser.json())
app.use(cors())

app.post("/add-user", async (req, res) => {
    try {
        const user = await Users.create({
            "name": req.body.name,
            "email": req.body.email,
            "username": req.body.username,
            "password": await bcrypt.hash(req.body.password, saltRounds),
        })
        res.status(200).json({ "msg": "user added" })
    } catch (err) {
        if (err.code === 11000 && err.keyPattern.email === 1) {
            console.log("Email already exists")
            res.status(401).json({ "error": "Email already exists" })
        }
        else if (err.code === 11000 && err.keyPattern.username === 1) {
            console.log("Username already exists")
            res.status(402).json({ "error": "Username already exists" })
        }
        else {
            console.error("Error:", err);
            res.status(500).json({ "error": "Internal Server Error" });
        }
    }
})

app.post("/get-user", async (req, res) => {
    try {
        const user = await Users.findOne({ username: req.body.username })
        res.status(200).json(user)
        console.log(user)
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ "error": "Internal Server Error" });
    }
})

app.post("/login-user", async (req, res) => {
    try {
        const user = await Users.findOne({ username: req.body.username })
        const password = await bcrypt.compare(req.body.password, user.password);
        if (password) {
            res.status(200).json(user)
            console.log(user.password)
        }
        else {
            res.status(300).json("Password Wrong")
        }
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

app.post("/get-transactions/:username", async (req, res) => {
    try {
        const transaction = await Transactions.find({ username: req.params.username })
        res.status(200).json({ transaction })
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ "error": "Internal Server Error" });
    }
})

app.get("/update-visits", async (req, res) => {
    try {
        visits += 1
        console.log("Visits:", visits);
        res.status(200).json({ visits })
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ "error": "Internal Server Error" });
    }
})

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


const PORT = 8000
app.listen(PORT, () => {
    console.log("Server listening on " + PORT)
})