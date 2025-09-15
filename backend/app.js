require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const HoldingModel = require("./models/HoldingModel.js");
const PositionModel = require("./models/PositionModel.js");
const OrderModel = require("./models/OrderModel.js");
const StockDataModel = require("./models/StockDataModel.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const cron = require("node-cron")
const WatchListModel = require('./models/WatchListModel.js');
const orderRoute = require("./Routes/OrderRoute.js");
const { newOrderController, cronController } = require('./Controllers/NewOrder.js');
const { userVerification } = require('./Middlewares/AuthMiddleware.js');
const watchlistRoute = require("./Routes/WatchListRoute.js");
const LoadDataRoute = require("./Routes/LoadDataRoute.js")
const { PORT = 3002, MONGO_URL: URL } = process.env;
const app = express();
mongoose.connect(URL).then(() => {
    console.log("Mongo is Connected");
}).catch((e) => console.log("Mongo Error"));
app.listen(PORT, () => {
    console.log("Server is working at port " + PORT);
})
app.use(cors());
app.use(bodyParser.json());

app.use("/load", LoadDataRoute)

app.use("/watchlist", watchlistRoute);

app.use("/order", orderRoute)
// CRON: Every day at 11:59 PM → move CNC from positions to holdings
cron.schedule("59 23 * * *", cronController);
// Using mongoose and transactions (recommended if your Mongo is a replica set)

