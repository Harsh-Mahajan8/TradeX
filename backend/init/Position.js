require("dotenv").config();
const mongoose = require("mongoose");
const PositionModel = require("../models/PositionModel");
const { positions } = require("../../dashboard/src/Data/data.js");

const URL = process.env.MONGO_URL;

async function main() {
  try {
    await mongoose.connect(URL);
    console.log("✅ Mongo is connected in Position init");

    // Insert data
    await PositionModel.deleteMany({});
    await PositionModel.insertMany(positions);
    console.log("✅ Position data is saved in DB");

  } catch (err) {
    console.error("❌ Error in Position init:", err.message);
  }
}

main();
