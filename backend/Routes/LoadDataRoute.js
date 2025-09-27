const { loadHoldings, loadPositions, loadOrder, loadWatchList, loadStockdata, loadUserData } = require('../Controllers/LoadDataFromModels.js');

const router = require("express").Router();

router.get('/holdings', loadHoldings);

router.get('/positions', loadPositions);

router.get('/orders', loadOrder);

router.get("/watchlist", loadWatchList);

router.get('/stocks', loadStockdata);

router.get('/userdata', loadUserData);


module.exports = router;    