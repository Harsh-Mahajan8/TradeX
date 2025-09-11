require("dotenv").config();
const mongoose = require("mongoose");
const WatchListModel = require("../models/WatchListModel");
const { watchlists } = require("../../dashboard/src/Data/data.js");

const URL = process.env.MONGO_URL;

async function main() {
    try {
        await mongoose.connect(URL);
        console.log("✅ Mongo is connected in WatchList init");

        // Insert data
        await WatchListModel.deleteMany({});
        // await WatchListModel.insertMany(watchlists);
        console.log("✅ WatchList data is saved in DB");

    } catch (err) {
        console.error("❌ Error in WatchList init:", err.message);
    }
}

main();
