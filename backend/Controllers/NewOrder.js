const HoldingModel = require("../models/HoldingModel.js");
const PositionModel = require("../models/PositionModel.js");
const OrderModel = require("../models/OrderModel.js");
const StockDataModel = require("../models/StockDataModel.js");

module.exports.newOrderController = async (req, res) => {
    try {
        console.log(req.originalUrl);
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
        const stockInPosition = await PositionModel.findOne({ name, product });
        if (stockInPosition) {
            //update qty
            //update avg price
            const newqty = stockInPosition.qty + qty;
            const newAvg = ((stockInPosition.avg * stockInPosition.qty + price * qty) / newqty);
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
        //push that position in user.position
        // after 24 hrs remove from posiiton 
        // is product is cnc then 
        // add to holding
        // if alredy same stock is present then simply add the qty and compute avg price
        // if not present then create new holding doc.
        //usecron
    } catch (e) {
        console.log("Error in newOrder Api", e)
    };
}

// CRON: Every day at 11:59 PM → move CNC from positions to holdings
module.exports.cronController = async () => {
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
};