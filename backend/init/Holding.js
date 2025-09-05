require("dotenv").config();
const mongoose = require("mongoose");
const HoldingModel = require("../models/HoldingModel");
const { holdings } = require("../../dashboard/src/Data/data.js");

const URL = process.env.MONGO_URL;

async function main() {
  try {
    await mongoose.connect(URL);
    console.log("✅ Mongo is connected in holding init");

    // Insert data
    await HoldingModel.deleteMany({});
    await HoldingModel.insertMany(holdings);
    console.log("✅ Holding data is saved in DB");

  } catch (err) {
    console.error("❌ Error in holding init:", err.message);
  }
}

main();
