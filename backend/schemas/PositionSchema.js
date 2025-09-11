const { Schema } = require("mongoose");

const PositionSchema = new Schema({
    product: String,
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    day: Number,
})

module.exports = PositionSchema;
