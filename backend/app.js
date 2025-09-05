require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const HoldingModel = require("./models/HoldingModel.js");
const PositionModel = require("./models/PositionModel.js");
const OrderModel = require("./models/OrderModel.js");
const cors = require("cors");
const bodyParser = require("body-parser");

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
app.use(cors());
app.use(bodyParser.json());

app.get('/allholding', async (req, res) => {
    let allHolding = await HoldingModel.find({});
    res.send(allHolding);
})
app.get('/allposition', async (req, res) => {
    let allPosition = await PositionModel.find({});
    res.send(allPosition);
})
app.get('/allorder', async (req, res) => {
    let allOrder = await OrderModel.find({});
    res.send(allOrder);
})