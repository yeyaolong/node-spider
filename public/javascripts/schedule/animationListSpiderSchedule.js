const schedule = require('node-schedule');
const animationListSpider = require('../spider/animationListSpider');

const animationListSpiderStart = function () {
    // 秒 分 时 日 月 周几
    schedule.scheduleJob('0 30 0 * * * *', function () {
        // 每天凌晨00:30 执行爬虫
        animationListSpider()
    });
}

module.exports = animationListSpiderStart