const { model } = require("mongoose");
const PositionSchema = require("../schemas/PositionSchema.js")

module.exports = model("Position", PositionSchema);