const { Schema } = require('mongoose')

const HoldingSchema = new Schema({
    product: String,
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: Number,
    day: Number,
})

module.exports = HoldingSchema;