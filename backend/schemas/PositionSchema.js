const { Schema } = require("mongoose");

const PositionSchema = new Schema({
    product: String,
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: Number,
    day: Number,
    isLoss: Boolean,
    expiryTime: Date
})

module.exports = PositionSchema;
