
//****************************************************************
//note: we have to make a callback to the object returned from the
//runescape API - as the data can take a few seconds to get inside
//of the object
module.exports = function(id, callback /* FUNCTION */) {
        var url = 'http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=' + id;
        var request = require('request');

        request(url, function (error, res, body) {
            //success
            if (!error && res.statusCode == 200) {
                var obj = JSON.parse(body);
                callback(obj);
                return 1;
            }
            //error check
            else {
                callback(404);
                console.log('[ERROR]: Bad http status in API call to runescape website - Http status: ' + res.statusCode);
                console.log('Requested URL was: ' + url);
            }
        }) //end request
}