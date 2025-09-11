const { Schema } = require("mongoose");

const WatchListSchema = new Schema({
    name: String,
    price: Number,
    percent: Number,
    product: String,
    avgCost: Number,
    ycp: Number
})

module.exports = WatchListSchema;