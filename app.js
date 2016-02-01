var express   = require('express');
var app       = express();
var routesApi = require('./api/routes/router')
var path      = require('path');

//set-up API for back-end
app.use('/api',routesApi);


app.use(express.static(path.join(__dirname, 'front')));

//listen on port 3000 - send message to console
app.listen(3000, function(){
    console.log('App launched - Port [3000]');
})