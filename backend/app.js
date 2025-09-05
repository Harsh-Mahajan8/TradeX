require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3002;
const URL = process.env.MONGO_URL;

const app = express();
mongoose.connect(URL).then(() => {
    console.log("Mongo is Connected");
}).catch((e) => console.log("Mongo Error"));
console.log(URL);
app.listen(PORT, () => {
    console.log("Server is working at port 3002");
})

app.get("/root", (req, res) => {
    res.send("Hello this is root directory!!!")
    console.log(req.path);
})