const { model } = require("mongoose");
const WatchListSchema = require("../schemas/WatchListSchema.js")

module.exports = model("WatchList", WatchListSchema);

