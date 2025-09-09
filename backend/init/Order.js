require("dotenv").config();
const mongoose = require("mongoose");
const OrderModel = require("../models/OrderModel");
const { watchlist } = require("../../dashboard/src/Data/data.js");

const URL = process.env.MONGO_URL;

async function main() {
    try {
        await mongoose.connect(URL);
        console.log("✅ Mongo is connected in Order init");

        // Insert data from user
        await OrderModel.deleteMany({});
        // await OrderModel.insertMany(watchlist);
        console.log("✅ Order data is saved in DB");

    } catch (err) {
        console.error("❌ Error in Order init:", err.message);
    }
}

main();
