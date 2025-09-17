const { model, Schema } = require("mongoose");


const OrderSchema = new Schema({
    name: String,
    qty: Number,
    price: Number,
    orderStatus: { type: String, default: "Executed" },
    mode: String,
    product: String,
    time: { type: Date, default: Date.now }
})


module.exports = model("Order", OrderSchema);