const { model } = require("mongoose");
const HoldingSchema = require("../schemas/HoldingSchema.js")

module.exports = model("Holding", HoldingSchema);