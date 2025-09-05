const {model} = require("mongoose");
const OrderSchema = require("../schemas/OrderSchema.js")

module.exports = model("Order",OrderSchema);