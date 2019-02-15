/**
 * 获取新番列表
 */
const superagent = require('superagent');
// const cheerio = require('cheerio');
const fs = require('fs');
const animationListOperation = require('../../database/operation/animationOperation');
const animationDetailSpider = require('./animationDetailSpider');
const targetUrl = require('../../static/config/config').targetUrl
const fileUtil = require('../util/fileUtil');

const AnimationListSpider = function () {
    superagent.get(targetUrl).end((err, res) => {
        if (err) {
            console.log('获取新番列表失败')
            throw err;
        }
        if (res.body.code === 0) {
            // 获取新番列表成功
            handleAnimationArray(res.body.result)
        } else {
            console.error(`获取新番列表失败：${res.body.message}`)
        }
    });
}

const handleAnimationArray = function (animationArray = []) {
    if (animationArray.length > 0) {
        let length = animationArray.length;
        let data = '';
        let filePath = fileUtil.getAnimationListFilePath();
        fileUtil.writeSync(filePath, '[', function (err, data) {
            if (err) {
                console.log(err);
                throw err
            }
        });
        for (let i = length - 1; i >= 0; i--) {
            data = JSON.stringify(animationArray[i]);
            if (i != 0) {
                data = `${data},`
            }
            fileUtil.writeSync(filePath, data, function (err, data) {
                if (err) {
                    console.log(err);
                    throw err
                }
            });
            // 将数据插入到mongodb中
            animationListOperation.insertOrUpdate(animationArray[i]).then(() => {
                // 爬取番剧详情内容,并插入数据库
                animationListOperation.findBySeasonId(animationArray[i].season_id, animationDetailSpider);
            });
        }
        fileUtil.writeSync(filePath, '[', function (err, data) {
            if (err) {
                console.log(err);
                throw err
            }
        });
        /* 读取文件内容 */
        fs.readFile(filePath, 'utf-8', function (err, data) {
            // console.log(JSON.parse(data))
            // console.log(`read from file\n ${data}`);
        });
    } else {
        return []
    }
}

module.exports = AnimationListSpider;