const DB_URL = require('../static/config/db.config').DB_URL
var mongoose = require('mongoose');

/*
 * 连接
 * */
mongoose.connect(DB_URL);

/*
 * 连接成功
 */
mongoose.connection.on('connected', function (err) {
    console.log('Mongoose connection open to ');
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
   console.log('Monggose connection error: ' + err);
});

/*
 * 连接断开
 */
mongoose.connection.on('disonnected', function () {
   console.log('Mongoose connection disconnected');
});

module.exports = mongoose