//controller for rs-item
var graphModel = require('../models/rs-item-graph');


//this concept of the callback method really threw me for a loop
//i had no prior experience with programming like this - pretty cool
module.exports.itemGraph = function (req, res){
    var itemId = req.params.itemId;

    graphModel(itemId, function(item){
        res.json(item);
    });

    console.log('[REQUEST] - Graph Data for item: ' + itemId);
}