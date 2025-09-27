require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const cron = require("node-cron")
const cookieParser = require('cookie-parser');
const orderRoute = require("./Routes/OrderRoute.js");

const { cronController } = require('./Controllers/NewOrder.js');
const authRoute = require("./Routes/AuthRoute.js");
const watchlistRoute = require("./Routes/WatchListRoute.js");
const LoadDataRoute = require("./Routes/LoadDataRoute.js");
const { userVerification } = require('./Middlewares/AuthMiddleware.js');
const { PORT = 3002, MONGO_URL: URL } = process.env;
const app = express();
mongoose.connect(URL).then(() => {
    console.log("Mongo is Connected");
}).catch((e) => console.log("Mongo Error"));
app.listen(PORT, () => {
    console.log("Server is working at port " + PORT);
})
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/load", userVerification, LoadDataRoute)
app.use("/user", authRoute);

app.use("/watchlist", userVerification, watchlistRoute);

app.use("/order", userVerification, orderRoute)
// CRON: Every day at 11:59 PM → move CNC from positions to holdings
cron.schedule("59 23 * * *", cronController);
// Using mongoose and transactions (recommended if your Mongo is a replica set)

