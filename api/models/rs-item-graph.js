

module.exports = function(id, callback /* FUNCTION */) {
    var url = 'http://services.runescape.com/m=itemdb_rs/api/graph/' + id + '.json';
    var request = require('request');

    request(url, function (error, res, body) {
        //success
        if (!error && res.statusCode == 200) {
            var obj = JSON.parse(body);
            callback(obj);
        }
        //error check
        else {
            console.log('[ERROR]: Bad http status in API call to runescape website - Http status: ' + res.statusCode);
            console.log('Requested URL was: ' + url);
        }
    }); //end request
};