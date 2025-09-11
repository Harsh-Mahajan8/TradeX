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
});

app.get('/allposition', async (req, res) => {
    let allPosition = await PositionModel.find({}).sort({ _id: -1 });
    res.send(allPosition);
});

app.get('/allorder', async (req, res) => {
    let allOrder = await OrderModel.find({}).sort({ _id: -1 });
    res.send(allOrder);
});

app.get("/allwatchlist", async (req, res) => {
    let allWatchList = await WatchListModel.find({}).sort({ _id: -1 });
    res.send(allWatchList);
});
app.get('/allstockdata', async (req, res) => {
    let allStock = await StockDataModel.find({}).sort({ _id: -1 });
    res.send(allStock);
});
app.post("/addtowatchList", async (req, res) => {
    try {
        const { name } = req.body;
        const stockData = await StockDataModel.findOne({ name });

        if (!stockData) {
            return res.status(404).json({ message: "Stock not found in stock data" });
        }

        // Check if already exists in watchlist
        const existingWatchlist = await WatchListModel.findOne({ name });
        if (existingWatchlist) {
            return res.status(400).json({ message: "Stock already in watchlist" });
        }

        const newWatchlistItem = new WatchListModel(stockData.toObject());
        await newWatchlistItem.save();

        console.log("Stock is saved on WatchList!!");
        res.json({ message: "Stock added to watchlist successfully" });
    } catch (error) {
        console.error("Error adding to watchlist:", error);
        res.status(500).json({ message: "Error adding stock to watchlist" });
    }
});

app.put("/removefromwatchlist", async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Stock name is required" });
        }

        const result = await WatchListModel.deleteOne({ name });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Stock not found in watchlist" });
        }

        console.log("removed from watchlist!!");
        res.json({ message: "Stock removed from watchlist successfully" });
    } catch (error) {
        console.error("Error removing from watchlist:", error);
        res.status(500).json({ message: "Error removing stock from watchlist" });
    }
});

app.post("/neworder", async (req, res) => {
    try {
        const { name, qty, price, mode, product, orderStatus } = req.body;
        const { avgCost: avg, percent: net, ycp } = await StockDataModel.findOne({ name });
        const day = (((price - ycp) / ycp) * 100);
        // console.log(name, qty, price, mode, product, orderStatus, avg, net, ycp, day);
        // console.log("Order executed")
        //same in orderMOdel
        const newOrder = new OrderModel({
            name, qty, price, orderStatus, mode, product
        })
        await newOrder.save()
            .then((res) => {
                console.log("New order is saved !", res);
            })
            .catch((e) => { console.log(e); });
        //if statuc is executed //always executed incase of buy order

        // save in position model ->
        //if alredy same stock is present then simply add the qty and compute avg price
        const stockInPosition = await PositionModel.findOne({ name, product })
        if (stockInPosition) {
            //update qty
            //update avg price
            const newqty = stockInPosition.qty + qty;
            const newAvg = ((stockInPosition.avg * stockInPosition.qty + price * qty) / totalQty);
            await PositionModel.findOneAndUpdate({ name, product }, { qty: newqty, avg: newAvg });
            console.log("posiiton updated in Buy stock api")
        } else {
            //if not present then create new position doc.
            const newPosit = new PositionModel({
                product, name, qty, avg, price, day
            });
            await newPosit.save();
            console.log("In Buy orde api new position saved")
            // await PositionModel.insertOne({
            //     
            // }, { new: true }).then((res) => {
            //     console.log("new position is saved in Byu api", res)
            // })
        }

        // after 24 hrs remove from posiiton 
        // is product is cnc then 
        // add to holding
        // if alredy same stock is present then simply add the qty and compute avg price
        // if not present then create new holding doc.
        //usecron
    } catch (e) {
        console.log("Error in newOrder Api", e)
    };

})
// CRON: Every day at 11:59 PM → move CNC from positions to holdings
cron.schedule("59 23 * * *", async () => {
    console.log("Running end-of-day job...");

    const cncPositions = await PositionModel.find({ product: "CNC" });

    for (let pos of cncPositions) {
        let holding = await HoldingModel.findOne({ name: pos.name });
        if (holding) {
            // merge qty & avg
            const totalQty = holding.qty + pos.qty;
            const newAvg =
                (holding.avg * holding.qty + pos.avg * pos.qty) / totalQty;
            holding.qty = totalQty;
            holding.avg = newAvg;
            await holding.save();
        } else {
            await new HoldingModel(pos.toObject()).save();
        }
        await PositionModel.deleteOne({ _id: pos._id });
    }
});
// Using mongoose and transactions (recommended if your Mongo is a replica set)
app.post('/sellOrder', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, qty, price, mode, product, orderStatus } = req.body;
        if (!name || !qty) return res.status(400).json({ message: "Missing fields" });

        // Load docs inside the session
        const pos = await PositionModel.findOne({ name, product }).session(session);
        const hold = await HoldingModel.findOne({ name, product }).session(session);

        const posQty = pos ? pos.qty : 0;
        const holdQty = hold ? hold.qty : 0;
        const totalQty = posQty + holdQty;

        if (totalQty < qty) {
            // Not enough -> save cancelled order and abort
            await OrderModel.create([{
                name, qty, price, orderStatus: "Cancelled", mode, product
            }], { session });
            await session.commitTransaction();
            session.endSession();
            return res.status(400).json({ message: "Insufficient quantity, order cancelled" });
        }

        // Save executed order
        await OrderModel.create([{
            name, qty, price, orderStatus: "Executed", mode, product
        }], { session });

        let remainingToSell = qty;

        // Reduce from Position first
        if (pos && remainingToSell > 0) {
            const sellFromPos = Math.min(remainingToSell, posQty);
            const newPosQty = posQty - sellFromPos;
            if (newPosQty <= 0) {
                await PositionModel.deleteOne({ _id: pos._id }).session(session);
            } else {
                pos.qty = newPosQty;
                await pos.save({ session });
            }
            remainingToSell -= sellFromPos;
        }

        // Then reduce from Holding
        if (hold && remainingToSell > 0) {
            const sellFromHold = Math.min(remainingToSell, holdQty);
            const newHoldQty = holdQty - sellFromHold;
            if (newHoldQty <= 0) {
                await HoldingModel.deleteOne({ _id: hold._id }).session(session);
            } else {
                hold.qty = newHoldQty;
                await hold.save({ session });
            }
            remainingToSell -= sellFromHold;
        }

        await session.commitTransaction();
        session.endSession();
        return res.json({ message: "Sell order executed successfully" });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error in /sellOrder:", err);
        return res.status(500).json({ message: "Error processing sell order", error: err.message });
    }
});


// app.post("/neworder", async (req, res) => {
//     try {
//         const data = req.body;
//         console.log("Received order data:", data);

//         // Validate required fields (frontend sends `qty`)
//         const { name, qty, price, mode, product: orderProduct, orderStatus } = data;
//         if (!name || !qty || !price || !mode || !orderProduct || !orderStatus) {
//             return res.status(400).json({
//                 message: "Missing required fields: name, qty, price, mode, product, orderStatus"
//             });
//         }

//         // Find stock details from DB (prefer stock data, fallback to watchlist)
//         let stockData = await StockDataModel.findOne({ name });
//         if (!stockData) {
//             stockData = await WatchListModel.findOne({ name });
//         }
//         if (!stockData) {
//             return res.status(400).json({ message: "Stock data not found" });
//         }

//         const { avgCost: avg, ycp } = stockData;

//         // Prevent division by zero
//         if (avg === 0 || ycp === 0) {
//             return res.status(400).json({ message: "Invalid stock data: avg or ycp cannot be zero" });
//         }

//         const net = ((price - avg) / avg) * 100;
//         const day = ((price - ycp) / ycp) * 100;

//         // Save the new order with all required fields
//         const newOrder = new OrderModel({
//             name,
//             qty,
//             price,
//             mode,
//             product: orderProduct,
//             orderStatus: "Executed",
//         });
//         await newOrder.save();
//         console.log("Buy Order saved successfully");

//         if (orderStatus === "Executed") {
//             const existingPosition = await PositionModel.findOne({ name, product: orderProduct });
//             if (existingPosition) {
//                 const totalQty = existingPosition.qty + qty;
//                 let newAvg = existingPosition.avg;
//                 newAvg = (existingPosition.avg * existingPosition.qty + price * qty) / totalQty;
//                 const updatedPosition = await PositionModel.findOneAndUpdate({ name: name, product: orderProduct }, {
//                     qty: totalQty,
//                     avg: newAvg,
//                     expiryTime: Date.now(),
//                     net: ((price - newAvg) / newAvg) * 100,
//                     day: ((price - ycp) / ycp) * 100
//                 });
//                 console.log("Position updated successfully", updatedPosition);
//             } else {
//                 const newPosition = new PositionModel({
//                     name,
//                     product: orderProduct,
//                     qty,
//                     avg: price,
//                     price,
//                     net: 0,
//                     day,
//                     isLoss: false,
//                     expiryTime: Date.now()
//                 });
//                 await newPosition.save();
//                 console.log("New position created");
//             }
//         }
//         setTimeout(async () => {
//             //Handle Holdings immediately if CNC
//             if (orderProduct === "CNC") {
//                 let existingHolding = await HoldingModel.findOne({ name, product: orderProduct });
//                 if (existingHolding) {
//                     const totalQty = existingHolding.qty + qty;
//                     let newAvg = existingHolding.avg;
//                     newAvg = (existingHolding.avg * existingHolding.qty + price * qty) / totalQty;
//                     const updateData = {
//                         qty: totalQty,
//                         avg: newAvg,
//                         net: ((price - newAvg) / newAvg) * 100,
//                         day: ((price - ycp) / ycp) * 100
//                     };
//                     const updatedHolding = await HoldingModel.findOneAndUpdate(
//                         { _id: existingHolding._id },
//                         updateData,
//                         { new: true }
//                     );
//                     console.log("Holding updated successfully", updatedHolding);
//                 } else {
//                     const newHolding = new HoldingModel({
//                         product: orderProduct,
//                         name,
//                         qty,
//                         avg,
//                         price,
//                         net,
//                         day,
//                     });
//                     await newHolding.save();
//                     console.log("New holding created");
//                 }
//             }
//             //delete from position
//             //remove qty
//             const existingPos = await PositionModel.findOne({ name, product: orderProduct });
//             if (existingPos) {
//                 const remainingQty = existingPos.qty - qty;
//                 if (remainingQty > 0) {
//                     await PositionModel.findOneAndUpdate(
//                         { _id: existingPos._id },
//                         { qty: remainingQty },
//                     );
//                 } else {
//                     await PositionModel.deleteOne({ _id: existingPos._id });
//                 }
//             }
//         }, 24 * 60 * 60 * 1000)
//         res.json({ message: "Order processed successfully" });

//     } catch (e) {
//         console.error("Error in /neworder:", e);
//         res.status(500).json({ msg: "Error in processing order", error: e.message });
//     }
// });

// app.post('/sellorder', async (req, res) => {
//     // try {
//     //     //getdata
//     //     let qtyInHolding = 0;
//     //     let qtyInPosition = 0;
//     //     const sellOrder = req.body;
//     //     //get sellqty
//     //     const { name, qty, price, mode, product: orderProduct, orderStatus } = sellOrder;
//     //     //get qty of stock in Holding
//     //     const isStockInHolding = await HoldingModel.findOne({ name, product: orderProduct });
//     //     if (isStockInHolding) {
//     //         qtyInHolding = isStockInHolding.qty;
//     //     }
//     //     //get qty of stock in holding
//     //     const isStockInPosition = await PositionModel.findOne({ name, product: orderProduct });
//     //     if (isStockInPosition) {
//     //         qtyInPosition = isStockInPosition.qty;
//     //     }
//     //     //check if qty(h+p)>=sellqty
//     //     let totalStockPresent = qtyInHolding + qtyInPosition;
//     //     const executeOrder = totalStockPresent >= qty;
//     //     // Validate required fields
//     //     if (!name || !qty || !price || !mode || !orderProduct || !orderStatus) {
//     //         return res.status(400).json({
//     //             message: "Missing required fields: name, qty, price, mode, product, orderStatus"
//     //         });
//     //     }

//     //     // Find stock details from watchlist
//     //     const stockData = stockData.find((stock) => stock.name === name);
//     //     if (!stockData) {
//     //         return res.status(400).json({ message: "Stock data not found in watchlist" });
//     //     }
//     //     const { avgCost: avg, ycp } = stockData;

//     //     // Prevent division by zero
//     //     if (avg === 0 || ycp === 0) {
//     //         return res.status(400).json({ message: "Invalid stock data: avg or ycp cannot be zero" });
//     //     }

//     //     const net = ((price - avg) / avg) * 100;
//     //     const day = ((price - ycp) / ycp) * 100;
//     //     // executeOrde===true
//     //     if (executeOrder) {
//     //         //give sell order with status executed
//     //         // Find stock details from watchlist
//     //         // Save the new order with all required fields and orderStatus executed
//     //         const newOrder = new OrderModel({
//     //             name,
//     //             qty,
//     //             price,
//     //             mode,
//     //             product: orderProduct,
//     //             orderStatus,
//     //         });
//     //         await newOrder.save();
//     //         console.log("sell Order saved successfully:Executed");

//     //         // Reduce from Position first, then from Holding for the remaining
//     //         let remainingToSell = qty;

//     //         if (qtyInPosition > 0 && remainingToSell > 0) {
//     //             const sellFromPosition = Math.min(remainingToSell, qtyInPosition);
//     //             const newQtyPosition = qtyInPosition - sellFromPosition;
//     //             if (newQtyPosition === 0) {
//     //                 await PositionModel.deleteOne({ name, product: orderProduct });
//     //             } else {
//     //                 await PositionModel.findOneAndUpdate(
//     //                     { name, product: orderProduct },
//     //                     { qty: newQtyPosition },
//     //                     { new: true }
//     //                 );
//     //             }
//     //             remainingToSell -= sellFromPosition;
//     //         }

//     //         if (remainingToSell > 0) {
//     //             // Must exist and be sufficient due to executeOrder
//     //             const newQtyHolding = qtyInHolding - remainingToSell;
//     //             if (newQtyHolding === 0) {
//     //                 await HoldingModel.deleteOne({ name, product: orderProduct });
//     //             } else {
//     //                 await HoldingModel.findOneAndUpdate(
//     //                     { name, product: orderProduct },
//     //                     { qty: newQtyHolding },
//     //                     { new: true }
//     //                 );
//     //             }
//     //         }

//     //         return res.json({ message: "Sell order executed successfully" });
//     //     } else {
//     //         //give order with status cancelled
//     //         // //if sellqty > q(h+p) then show an error msg of nor possible sell order

//     //         // Save the new order with all required fields and orderStatus cancelled
//     //         const newOrder = new OrderModel({
//     //             name,
//     //             qty,
//     //             price,
//     //             mode,
//     //             product: orderProduct,
//     //             orderStatus: "Cancelled",
//     //         });
//     //         await newOrder.save();
//     //         console.log("sell Order saved successfully:Cancelled");
//     //         return res.status(400).json({ message: "Sell order cancelled: insufficient quantity" });
//     //     }

//     //     // Fallback (should not reach here)
//     //     console.log("order sold!")
//     // } catch (e) {
//     //     console.error("Error in /sellorder:", e);
//     //     res.status(500).json({ msg: "Error in processing sell order", error: e.msg });
//     // }
//     console.log("Order sold!!")
// })
