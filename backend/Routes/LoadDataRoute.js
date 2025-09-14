const { loadHoldings, loadPositions, loadOrder, loadWatchList, loadStockdata } = require('../Controllers/LoadDataFromModels.js');

const router = require("express").Router();

router.get('/holdings', loadHoldings);

router.get('/positions', loadPositions);

router.get('/orders', loadOrder);

router.get("/watchlist", loadWatchList);

router.get('/stocks', loadStockdata);

module.exports = router;    