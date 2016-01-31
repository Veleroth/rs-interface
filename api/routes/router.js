var express = require('express');
var router = express.Router();

//route the url to the search function in the item controller
var itemControl = require('../controllers/rs-item.js');
router.get('/itemSearch/:itemId',itemControl.itemSearch )


module.exports = router;