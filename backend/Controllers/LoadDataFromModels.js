const HoldingModel = require("../models/HoldingModel.js");
const PositionModel = require("../models/PositionModel.js");
const OrderModel = require("../models/OrderModel.js");
const WatchListModel = require("../models/WatchListModel.js");
const StockDataModel = require("../models/StockDataModel.js");


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

module.exports = { loadHoldings, loadOrder, loadPositions, loadStockdata, loadWatchList }
