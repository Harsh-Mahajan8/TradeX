const { newOrderController } = require("../Controllers/NewOrder.js");
const { sellOrderController } = require('../Controllers/SellOrder.js');

const router = require("express").Router();

router.post("/buy", newOrderController);
router.post("/sell", sellOrderController);


module.exports = router;    