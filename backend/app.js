require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const HoldingModel = require("./models/HoldingModel.js");
const PositionModel = require("./models/PositionModel.js");
const OrderModel = require("./models/OrderModel.js");
const cron = require("node-cron");
const cors = require("cors");
const bodyParser = require("body-parser");
const { watchlists } = require("../dashboard/src/Data/data.js");

const PORT = process.env.PORT || 3002;
const URL = process.env.MONGO_URL;

const app = express();
mongoose.connect(URL).then(() => {
    console.log("Mongo is Connected");
}).catch((e) => console.log("Mongo Error"));
app.listen(PORT, () => {
    console.log("Server is working at port 3002");
})
app.use(cors());
app.use(bodyParser.json());

app.get('/allholding', async (req, res) => {
    let allHolding = await HoldingModel.find({}).sort({ _id: -1 });
    res.send(allHolding);
})
app.get('/allposition', async (req, res) => {
    let allPosition = await PositionModel.find({}).sort({ _id: -1 });
    res.send(allPosition);
})
app.get('/allorder', async (req, res) => {
    let allOrder = await OrderModel.find({}).sort({ _id: -1 });
    res.send(allOrder);
})

app.post("/neworder", async (req, res) => {
    try {
        const data = req.body;
        console.log("Received order data:", data);

        // Validate required fields
        const { name, qty, price, mode, product: orderProduct, orderStatus } = data;
        if (!name || !qty || !price || !mode || !orderProduct || !orderStatus) {
            return res.status(400).json({
                message: "Missing required fields: name, qty, price, mode, product, orderStatus"
            });
        }

        // Find stock details from watchlist
        const stockData = watchlists.find((stock) => stock.name === name);
        if (!stockData) {
            return res.status(400).json({ message: "Stock data not found in watchlist" });
        }

        const { avgCost: avg, ycp } = stockData;

        // Prevent division by zero
        if (avg === 0 || ycp === 0) {
            return res.status(400).json({ message: "Invalid stock data: avg or ycp cannot be zero" });
        }

        const net = ((price - avg) / avg) * 100;
        const day = ((price - ycp) / ycp) * 100;

        // Save the new order with all required fields
        const newOrder = new OrderModel({
            name,
            qty,
            price,
            mode,
            product: orderProduct,
            orderStatus,
        });
        await newOrder.save();
        console.log("Buy Order saved successfully");

        if (orderStatus === "Executed") {
            const existingPosition = await PositionModel.findOne({ name, product: orderProduct });

            if (existingPosition) {
                const totalQty = existingPosition.qty + qty;

                if (totalQty <= 0) {
                    await PositionModel.deleteOne({ _id: existingPosition._id });
                    console.log("Position deleted as quantity reached zero");
                } else {
                    let newAvg = existingPosition.avg;
                    if (qty > 0) {
                        newAvg = (existingPosition.avg * existingPosition.qty + price * qty) / totalQty;
                    }

                    existingPosition.qty = totalQty;
                    existingPosition.avg = newAvg;
                    existingPosition.price = price;
                    existingPosition.net = ((price - newAvg) / newAvg) * 100;
                    existingPosition.day = ((price - ycp) / ycp) * 100;
                    existingPosition.isLoss = (price - newAvg) < 0;

                    //Reset expiry time only for CNC
                    if (orderProduct === "CNC") {
                        existingPosition.expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
                    } else {
                        existingPosition.expiryTime = null;
                    }

                    await existingPosition.save();
                    console.log("Position updated successfully");
                }
            } else if (qty > 0) {
                const newPosition = new PositionModel({
                    name,
                    product: orderProduct,
                    qty,
                    avg,
                    price,
                    net,
                    day,
                    isLoss: net < 0,
                    expiryTime: orderProduct === "CNC" ? new Date(Date.now() + 24 * 60 * 60 * 1000) : null
                });
                await newPosition.save();
                console.log("New position created");
            }

            //Handle Holdings immediately if CNC
            if (orderProduct === "CNC") {
                let existingHolding = await HoldingModel.findOne({ name, product: orderProduct });
                if (existingHolding) {
                    const totalQty = existingHolding.qty + qty;

                    if (totalQty <= 0) {
                        await HoldingModel.deleteOne({ _id: existingHolding._id });
                        console.log("Holding deleted as quantity reached zero");
                    } else {
                        let newAvg = existingHolding.avg;
                        if (qty > 0) {
                            newAvg = (existingHolding.avg * existingHolding.qty + price * qty) / totalQty;
                        }

                        existingHolding.qty = totalQty;
                        existingHolding.avg = newAvg;
                        existingHolding.price = price;
                        existingHolding.net = ((price - newAvg) / newAvg) * 100;
                        existingHolding.day = ((price - ycp) / ycp) * 100;

                        await existingHolding.save();
                        console.log("Holding updated successfully");
                    }
                } else if (qty > 0) {
                    const newHolding = new HoldingModel({
                        product: orderProduct,
                        name,
                        qty,
                        avg,
                        price,
                        net,
                        day,
                    });
                    await newHolding.save();
                    console.log("New holding created");
                }
            }
        }


        res.json({ message: "Order processed successfully" });

    } catch (e) {
        console.error("Error in /neworder:", e);
        res.status(500).json({ msg: "Error in processing order", error: e.msg });
    }
});

app.post('/sellorder', async (req, res) => {
    try {
        //getdata
        let qtyInHolding = 0;
        let qtyInPosition = 0;
        const sellOrder = req.body;
        //get sellqty
        const { name, qty, price, mode, product: orderProduct, orderStatus } = sellOrder;
        //get qty of stock in Holding
        const isStockInHolding = await HoldingModel.findOne({ name, product: orderProduct });
        if (isStockInHolding) {
            qtyInHolding = isStockInHolding.qty;
        }
        //get qty of stock in holding
        const isStockInPosition = await PositionModel.findOne({ name, product: orderProduct });
        if (isStockInPosition) {
            qtyInPosition = isStockInPosition.qty;
        }
        //check if qty(h+p)>=sellqty
        let totalStockPresent = qtyInHolding + qtyInPosition;
        const executeOrder = totalStockPresent >= qty;
        // Validate required fields
        if (!name || !qty || !price || !mode || !orderProduct || !orderStatus) {
            return res.status(400).json({
                message: "Missing required fields: name, qty, price, mode, product, orderStatus"
            });
        }

        // Find stock details from watchlist
        const stockData = watchlists.find((stock) => stock.name === name);
        if (!stockData) {
            return res.status(400).json({ message: "Stock data not found in watchlist" });
        }
        const { avgCost: avg, ycp } = stockData;

        // Prevent division by zero
        if (avg === 0 || ycp === 0) {
            return res.status(400).json({ message: "Invalid stock data: avg or ycp cannot be zero" });
        }

        const net = ((price - avg) / avg) * 100;
        const day = ((price - ycp) / ycp) * 100;
        // executeOrde===true
        if (executeOrder) {
            //give sell order with status executed
            // Find stock details from watchlist
            // Save the new order with all required fields and orderStatus executed
            const newOrder = new OrderModel({
                name,
                qty,
                price,
                mode,
                product: orderProduct,
                orderStatus,
            });
            await newOrder.save();
            console.log("sell Order saved successfully:Executed");

            // Reduce from Position first, then from Holding for the remaining
            let remainingToSell = qty;

            if (qtyInPosition > 0 && remainingToSell > 0) {
                const sellFromPosition = Math.min(remainingToSell, qtyInPosition);
                const newQtyPosition = qtyInPosition - sellFromPosition;
                if (newQtyPosition === 0) {
                    await PositionModel.deleteOne({ name, product: orderProduct });
                } else {
                    await PositionModel.findOneAndUpdate(
                        { name, product: orderProduct },
                        { qty: newQtyPosition },
                        { new: true }
                    );
                }
                remainingToSell -= sellFromPosition;
            }

            if (remainingToSell > 0) {
                // Must exist and be sufficient due to executeOrder
                const newQtyHolding = qtyInHolding - remainingToSell;
                if (newQtyHolding === 0) {
                    await HoldingModel.deleteOne({ name, product: orderProduct });
                } else {
                    await HoldingModel.findOneAndUpdate(
                        { name, product: orderProduct },
                        { qty: newQtyHolding },
                        { new: true }
                    );
                }
            }

            return res.json({ message: "Sell order executed successfully" });
        } else {
            //give order with status cancelled
            // //if sellqty > q(h+p) then show an error msg of nor possible sell order

            // Save the new order with all required fields and orderStatus cancelled
            const newOrder = new OrderModel({
                name,
                qty,
                price,
                mode,
                product: orderProduct,
                orderStatus: "Cancelled",
            });
            await newOrder.save();
            console.log("sell Order saved successfully:Cancelled");
            return res.status(400).json({ message: "Sell order cancelled: insufficient quantity" });
        }

        // Fallback (should not reach here)
        console.log("order sold!")
    } catch (e) {
        console.error("Error in /sellorder:", e);
        res.status(500).json({ msg: "Error in processing sell order", error: e.msg });
    }
})

cron.schedule("*/5 * * * *", async () => { // runs every 5 min
    const now = new Date();
    const expiredPositions = await PositionModel.find({
        product: "CNC",
        expiryTime: { $lte: now }
    });

    for (let pos of expiredPositions) {
        // Move to Holdings
        let existingHolding = await HoldingModel.findOne({ name: pos.name, product: "CNC" });
        if (existingHolding) {
            const totalQty = existingHolding.qty + pos.qty;
            const newAvg = (existingHolding.avg * existingHolding.qty + pos.avg * pos.qty) / totalQty;

            existingHolding.qty = totalQty;
            existingHolding.avg = newAvg;
            existingHolding.price = pos.price;
            existingHolding.net = ((pos.price - newAvg) / newAvg) * 100;
            existingHolding.day = pos.day;

            await existingHolding.save();
            console.log(`Holding updated for ${pos.name}`);
        } else {
            const newHolding = new HoldingModel({
                product: "CNC",
                name: pos.name,
                qty: pos.qty,
                avg: pos.avg,
                price: pos.price,
                net: pos.net,
                day: pos.day
            });
            await newHolding.save();
            console.log(`New holding created for ${pos.name}`);
        }

        // Delete from Position
        await PositionModel.deleteOne({ _id: pos._id });
        console.log(`Position of ${pos.name} moved to Holding after 1 day`);
    }
});
