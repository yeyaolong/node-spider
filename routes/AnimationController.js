const express = require('express');
const connectMultiparty = require('connect-multiparty');
const animationOperation = require('../public/database/operation/animationOperation');
const router = express.Router();

// 根据追番人数排行
router.post('/sortBy', connectMultiparty(), function (req, res, next) {
    if (req.body && req.body.field && req.body.field.length > 0) {
        let field = req.body.field;
        let value = req.body.value === 'desc' ? -1 : 1
        let param = {}
        param[field] = value
        animationOperation.sortBy(param, function (data) {
            res.send(data);
        });
    } else {
        animationOperation.findAll(function (data) {
            res.send(data);
        });
    }
});


module.exports = router;