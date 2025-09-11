const { model } = require("mongoose");

const StockDataSchema = require("../schemas/StockDataSchema");

module.exports = model("StockDataModel", StockDataSchema);