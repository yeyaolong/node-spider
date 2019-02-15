/**
 * 获取新番详细内容
 */
const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
const fileUtil = require('../util/fileUtil')
const dateUtil = require('../util/dateUtil');
const animationDetailOperation = require('../../database/operation/animationDetailOperation');

const animationDetailSpider = function (animationParameter) {
    let animationDetail = {
        season_id: '',
        title: '', // 番剧标题
        description: '', // 番剧简介
        coins: 0, // 硬币数量
        danmakus: 0, // 弹幕数量
        favorites: 0, // 追番人数
        views: 0 // 播放总数
    }
    animationDetail.season_id = animationParameter.season_id;
    let targetUrl = `https://www.bilibili.com/bangumi/play/ss${animationParameter.season_id}`;
    superagent.get(targetUrl).end((err, res) => {
       if (err) {
           console.error(`获取番剧详情信息出错了${targetUrl}`);
           throw err;
       }
       getDataByCheerio(res, animationDetail).then(() => {
           getDataByRequest(animationParameter, animationDetail);
           getCommentRateByRequest(animationParameter, animationDetail);
       });
    });
}

function getDataByCheerio (res, animationDetail) {
    let _this = this;
    return new Promise((resolve, reject) => {
        // 通过cheerio直接从页面上获取的数据
        let filePath = fileUtil.getAnimationDetailFilePath()
        fileUtil.writeSync(filePath, JSON.stringify(res.text), function (err) {
            if(err) {
                console.error('番剧详情出错');
                throw err;
            }
        });
        let $ = cheerio.load(res.text, {decodeEntities:false});
        animationDetail.title = $('.media-wrapper h1').text(); // 番剧标题
        animationDetail.description = $('.media-desc').text(); // 番剧简介
        animationDetailOperation.insertOrUpdate(animationDetail).then(() => {
            resolve();
        });
    });
}

function getDataByRequest (animationParameter, animationDetail) {
    // 通过发送请求获取相关数据
    let season_type = dateUtil.getSeasonType();
    let targetUrl = `https://bangumi.bilibili.com/ext/web_api/season_count?season_id=${animationParameter.season_id}&season_type=${season_type}`;
    superagent.get(targetUrl).end((err, res) => {
        if (err) {
           console.error('通过发送请求获取相关数据出错了')
           throw err;
        }
        let result = res.body.result;
        animationDetail.season_id = animationParameter.season_id;
        animationDetail.coins = result.coins; // 硬币数量
        animationDetail.danmakus = result.danmakus; // 弹幕数量
        animationDetail.favorites = result.favorites; // 追番人数
        animationDetail.views = result.views; // 播放总数

        animationDetailOperation.insertOrUpdate(animationDetail).then(() => {
            animationDetailOperation.findBySeasonId(animationDetail.season_id, function (res) {
                /* 从数据库中查出内容，然后写到文件里，方便查看插入的数据(因为我这台电脑安装不上monogo-compass) */
                let filePath = fileUtil.getAnimationDetailDBFilePath();
                fileUtil.writeSync(filePath, JSON.stringify(res) + '\r\n', function (err) {
                   if (err) {
                       console.error(err);
                       throw err;
                   }
                });
            });
        });
    });
}

function getCommentRateByRequest (animationParameter, animationDetail) {
    // 获取评分


}

module.exports = animationDetailSpider;