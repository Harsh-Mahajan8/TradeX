const HoldingModel = require("../models/HoldingModel.js");
const PositionModel = require("../models/PositionModel.js");
const OrderModel = require("../models/OrderModel.js");
const WatchListModel = require("../models/WatchListModel.js");
const StockDataModel = require("../models/StockDataModel.js");
const UserModel = require("../models/UserModel.js");


const loadHoldings = async (req, res) => {
    console.log(req.originalUrl);
    let allHolding = await HoldingModel.find({}).sort({ _id: -1 });
    res.send(allHolding);
};
const loadPositions = async (req, res) => {
    console.log(req.originalUrl);

    let allPosition = await PositionModel.find({}).sort({ _id: -1 });
    res.send(allPosition);
};
const loadWatchList = async (req, res) => {
    console.log(req.originalUrl);

    let allWatchList = await WatchListModel.find({}).sort({ _id: -1 });
    res.send(allWatchList);
};
const loadStockdata = async (req, res) => {
    console.log(req.originalUrl);

    let allStock = await StockDataModel.find({}).sort({ _id: -1 });
    res.send(allStock);
};
const loadOrder = async (req, res) => {
    console.log(req.originalUrl);

    let allOrder = await OrderModel.find({}).sort({ _id: -1 });
    res.send(allOrder);
};

const loadUserData = async (req, res) => {
    console.log(req.originalUrl);
    console.log("User ID: ", req.user._id);
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        let userData = await UserModel.findOne({ _id: req.user._id })
            .populate('watchlist')
            .populate({
                path: 'holdings',
                options: { sort: { _id: -1 } }
            })
            .populate({
                path: 'positions',
                options: { sort: { _id: -1 } }
            })
            .populate({
                path: 'orders',
                options: { sort: { _id: -1 } }
            });


        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(userData);
    } catch (error) {
        console.error("Error in loadUserData:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
module.exports = { loadHoldings, loadOrder, loadPositions, loadStockdata, loadWatchList, loadUserData };
