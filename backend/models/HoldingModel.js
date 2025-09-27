const { model, Schema } = require("mongoose");
const HoldingSchema = new Schema({
    product: String,
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: Number,
    day: Number,
    user: { type: Schema.Types.ObjectId, ref: "User" }
})

module.exports = model("Holding", HoldingSchema);
