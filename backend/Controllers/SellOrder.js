const HoldingModel = require("../models/HoldingModel.js");
const PositionModel = require("../models/PositionModel.js");
const OrderModel = require("../models/OrderModel.js");
const mongoose = require("mongoose");
const userModel = require("../models/UserModel.js");

module.exports.sellOrderController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        console.log(req.originalUrl);
        const { name, qty, price, mode, product, orderStatus } = req.body;
        if (!name || !qty) return res.status(400).json({ msg: "Missing fields", status: "error" });

        // Load docs inside the session - check if they belong to the current user
        const pos = await PositionModel.findOne({ name, product }).session(session);
        const hold = await HoldingModel.findOne({ name, product }).session(session);

        // Verify ownership by checking if user has these positions/holdings
        const userPositions = await userModel.findById(req.user._id).select('positions').session(session);
        const userHoldings = await userModel.findById(req.user._id).select('holdings').session(session);

        const userOwnsPos = pos && userPositions.positions.includes(pos._id);
        const userOwnsHold = hold && userHoldings.holdings.includes(hold._id);

        const posQty = userOwnsPos ? pos.qty : 0;
        const holdQty = userOwnsHold ? hold.qty : 0;
        const totalQty = posQty + holdQty;

        if (totalQty < qty) {
            // Not enough -> save cancelled order and abort
            const cancelledOrder = await OrderModel.create([{
                name, qty, price, orderStatus: "Cancelled", mode, product
            }], { session });
            await userModel.findOneAndUpdate({ _id: req.user._id }, { $push: { orders: cancelledOrder[0]._id } }, { session });
            await session.commitTransaction();
            session.endSession();
            return res.status(200).json({ msg: "Insufficient quantity, order cancelled", status: "error" });
        }

        // Save executed order
        const newOrder = await OrderModel.create([{
            name, qty, price, orderStatus: "Executed", mode, product
        }], { session });
        await userModel.findOneAndUpdate({ _id: req.user._id }, { $push: { orders: newOrder[0]._id } }, { session });

        let remainingToSell = qty;

        // Reduce from Position first
        if (userOwnsPos && remainingToSell > 0) {
            const sellFromPos = Math.min(remainingToSell, posQty);
            const newPosQty = posQty - sellFromPos;
            if (newPosQty <= 0) {
                await PositionModel.deleteOne({ _id: pos._id }).session(session);
                await userModel.findOneAndUpdate({ _id: req.user._id }, { $pull: { positions: pos._id } }, { session });

            } else {
                pos.qty = newPosQty;
                await pos.save({ session });
            }
            remainingToSell -= sellFromPos;
        }

        // Then reduce from Holding
        if (userOwnsHold && remainingToSell > 0) {
            const sellFromHold = Math.min(remainingToSell, holdQty);
            const newHoldQty = holdQty - sellFromHold;
            if (newHoldQty <= 0) {
                await HoldingModel.deleteOne({ _id: hold._id }).session(session);
                await userModel.findOneAndUpdate({ _id: req.user._id }, { $pull: { holdings: hold._id } }, { session });
            } else {
                hold.qty = newHoldQty;
                await hold.save({ session });
            }
            remainingToSell -= sellFromHold;
        }

        await session.commitTransaction();
        session.endSession();
        return res.json({ msg: "Sell order executed successfully", status: "success" });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error in /sellOrder:", err);
        return res.status(500).json({ msg: "Error processing sell order", error: err.message, status: "error" });
    }
};