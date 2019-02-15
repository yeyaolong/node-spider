const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
let url = require('url');
const hupuUrl = 'https://bbs.hubu.com/selfie-1';

let ssr = [];
let allUrl = [];
let curCount = 0;

for (let i = 1; i <=4; i++) {
    let hupuUrl2 = `https://bbs.hupu.com/selfie-${i}`;
    // 通过superagent去请求每一页
    superagent.get(hupuUrl2).end(function (err, res) {
        if (err) {
            return console.error(err);
        }
        let $ = cheerio.load(res.text);
        $('.titlelink>a:first-child').each(function (idx, element) {
           let $element = $(element);
           let href = url.resolve(hupuUrl2, $element.attr('href'));
           allUrl.push(href);
           curCount++;
           // 获取到url，异步进行以下操作，此操作为进入到帖子中爬取数据
            superagent.get(href).end(function (err, res) {
                if (err) {
                       return console.error(err)
                }
                let $ = cheerio.load(res.text);
                let add = href;
                let title = $('.bbs-hd-h1>h1').attr('data-title'); // 帖子标题
                let tximg = $('.headpic:first-child>img').attr('src'); // 用户头像
                let txname = $('.j_u:first-child>img').attr('uname'); // 用户ID
                let contentimg1 = $('.quote-content>p:nth-child(1)>img').attr('src');
                let contentimg2 = $('.quote-content>p:nth-child(2)>img').attr('src');
                let contentimg3 = $('.quote-content>p:nth-child(3)>img').attr('src');
                ssr.push({
                    'tx': tximg,
                    'name': txname,
                    'pic': contentimg1, contentimg2, contentimg3
                });
                // 把数据储存到一个对象里
                let stad = {
                    "address": add,
                    "title": title,
                    "ID": txname,
                    "pic1": contentimg1,
                    "pic2": contentimg2,
                    "pic3": contentimg3
                };
                // 通过fs 模块把数据写入本地json.
                fs.appendFile('../../static/data/result.json', JSON.stringify(stad) + ',\n', 'utf-8', function (err) {
                    if (err) {
                        console.log('err', err);
                        throw new Error("append file failed...");
                    }
                });
            });
        });
    });



}