const { model, Schema } = require("mongoose");

const StockDataSchema = new Schema({
    name: String,
    price: Number,
    percent: Number,
    avgCost: Number,
    ycp: Number,
});

module.exports = model("StockDataModel", StockDataSchema);