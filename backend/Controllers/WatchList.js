const StockDataModel = require("../models/StockDataModel.js");
const WatchListModel = require("../models/WatchListModel.js");

module.exports.addToWatchListContoller = async (req, res) => {
    try {
        console.log(req.originalUrl);

        const { name } = req.body;
        const stockData = await StockDataModel.findOne({ name });

        if (!stockData) {
            return res.status(404).json({ message: "Stock not found in stock data", status: "error" });
        }

        // Check if already exists in watchlist
        const existingWatchlist = await WatchListModel.findOne({ name });
        if (existingWatchlist) {
            return res.status(200).json({ message: "Stock already in watchlist", status: "success" });
        }

        const newWatchlistItem = new WatchListModel(stockData.toObject());
        await newWatchlistItem.save();

        console.log("Stock is saved on WatchList!!");
        res.json({ message: `${name} Stock added to watchlist successfully`, status: "success" });
    } catch (error) {
        console.error("Error adding to watchlist:", error);
        res.status(500).json({ message: "Error adding stock to watchlist", status: "error" });
    }
};

module.exports.removeFromWatchListContoller = async (req, res) => {
    try {
        console.log(req.originalUrl);

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Stock name is required" });
        }

        const result = await WatchListModel.deleteOne({ name });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Stock not found in watchlist", status: "error" });
        }

        console.log("removed from watchlist!!");
        res.json({ message: `${name}Stock removed from watchlist successfully`, status: "success" });
    } catch (error) {
        console.error("Error removing from watchlist:", error);
        res.status(500).json({ message: "Error removing stock from watchlist", status: "error" });
    }
}