const { addToWatchListContoller, removeFromWatchListContoller } = require('../Controllers/WatchList.js');
const router = require("express").Router();

router.put("/add", addToWatchListContoller);

router.delete("/remove", removeFromWatchListContoller);

module.exports = router;