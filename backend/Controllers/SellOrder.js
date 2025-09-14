require('dotenv').config();
const HoldingModel = require("../models/HoldingModel.js");
const PositionModel = require("../models/PositionModel.js");
const OrderModel = require("../models/OrderModel.js");
const mongoose = require("mongoose");

module.exports.sellOrderController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        console.log(req.originalUrl);
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
};