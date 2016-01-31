var express = require('express');
var app = express();
var routesApi = require('./api/routes/router')

//set-up API for back-end
app.use('/api',routesApi);

//launch front-end (angular.js)
app.get('*', function(req, res) {
    res.sendfile('./index.html');
});

//listen on port 3000 - send message to console
app.listen(3000, function(){
    console.log('App launched - Port [3000]');
})