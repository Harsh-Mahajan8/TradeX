const { model, Schema } = require("mongoose");

const PositionSchema = new Schema({
    product: String,
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    day: Number,
    time: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: "User" }
})

module.exports = model("Position", PositionSchema);