const StockDataModel = require("../models/StockDataModel.js");
const UserModel = require("../models/UserModel.js");
const WatchListModel = require("../models/WatchListModel.js");

module.exports.addToWatchListContoller = async (req, res) => {
    try {
        console.log(req.originalUrl);

        const { name } = req.body;
        const stockData = await StockDataModel.findOne({ name });

        if (!stockData) {
            return res.status(404).json({ message: "Stock not found in stock data", status: "error" });
        }

        // Find if WatchList already exists for this stock name (shared)
        let watchlistItem = await WatchListModel.findOne({ name });

        // Check if already in user's watchlist
        const user = await UserModel.findOne({ _id: req.user._id }).populate('watchlist');
        const alreadyInWatchlist = user.watchlist.some(item => item.name === name);

        if (alreadyInWatchlist) {
            return res.status(200).json({ message: "Stock already in watchlist", status: "success" });
        }

        if (!watchlistItem) {
            // Create new WatchList excluding _id
            const watchlistData = { ...stockData.toObject() };
            delete watchlistData._id;
            watchlistItem = new WatchListModel(watchlistData);
            await watchlistItem.save();
        }

        // Add to user's watchlist
        await UserModel.findOneAndUpdate(
            { _id: req.user._id },
            { $push: { watchlist: watchlistItem._id } }
        );

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

        // Find the watchlist item to get its _id
        const watchlistItem = await WatchListModel.findOne({ name });
        if (!watchlistItem) {
            return res.status(404).json({ message: "Stock not found in watchlist", status: "error" });
        }

        // Remove the _id from user's watchlist array
        await UserModel.findOneAndUpdate({ _id: req.user._id }, { $pull: { watchlist: watchlistItem._id } });

        console.log("removed from watchlist!!");
        res.json({ message: `${name} Stock removed from watchlist successfully`, status: "success" });
    } catch (error) {
        console.error("Error removing from watchlist:", error);
        res.status(500).json({ message: "Error removing stock from watchlist", status: "error" });
    }
}
