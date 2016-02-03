//controller for rs-item
var itemModel = require('../models/rs-item');


//this concept of the callback method really threw me for a loop
//i had no prior experience with programming like this - pretty cool
module.exports.itemSearch = function (req, res){
    var itemId = req.params.itemId;

      (itemModel(itemId, function(item){
        res.json(item);
    }))
    console.log('[REQUEST] - Searched for item: ' + itemId);
}