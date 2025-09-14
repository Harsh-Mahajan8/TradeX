const { addToWatchListContoller, removeFromWatchListContoller } = require('../Controllers/WatchList.js');
const router = require("express").Router();

router.post("/add", addToWatchListContoller);

router.delete("/remove", removeFromWatchListContoller);

module.exports = router;