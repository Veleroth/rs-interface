var express = require('express');
var router = express.Router();

//route the url to the search function in the item controller
var itemControl = require('../controllers/rs-item.js');
var graphControl = require('../controllers/rs-item-graph.js');
router.get('/itemSearch/:itemId',itemControl.itemSearch );
router.get('/itemGraph/:itemId',graphControl.itemGraph);

module.exports = router;