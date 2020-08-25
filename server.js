'use strict';
var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 1337);

// In order to resolve URL refresh error on F5/Enter
app.get('*', function (req, res) {
    const index = path.join(__dirname, '', 'index.html');
    res.sendFile(index);
});


var server = app.listen(app.get('port'), function () {
    //console.log('listening');
});
