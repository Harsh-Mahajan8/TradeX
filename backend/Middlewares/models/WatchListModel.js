const { Schema, model } = require("mongoose");

const WatchListSchema = new Schema({
    name: String,
    price: Number,
    percent: Number,
    product: String,
    avgCost: Number,
    ycp: Number
})

module.exports = model("WatchList", WatchListSchema);

