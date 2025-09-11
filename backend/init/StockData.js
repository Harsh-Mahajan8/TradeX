require("dotenv").config();
const mongoose = require("mongoose");
const StockDataModel = require("../models/StockDataModel");
const { stockData } = require("../../dashboard/src/Data/data.js");

const URL = process.env.MONGO_URL;

async function main() {
  try {
    await mongoose.connect(URL);
    console.log("✅ Mongo is connected in StockData init");

    // Insert data
    await StockDataModel.deleteMany({});
    await StockDataModel.insertMany(stockData);
    console.log("✅ StockData data is saved in DB");

  } catch (err) {
    console.error("❌ Error in StockData init:", err.message);
  }
}

main();
