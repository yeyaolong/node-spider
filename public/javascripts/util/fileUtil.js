const dateUtil = require('./dateUtil');
const fs = require('fs');

const fileUtil = {
    writeSync: function (path, data, callback) {
        // flag 'a' 追加 相当于appendFile(), 'w' (清空后)写入 writeFile默认， 'r' 读取 相当于readFile()
        fs.writeFileSync(path, data, {encoding: 'utf-8', flag: 'a'}, function (err, data) {
            if (err) {
                console.error(`写入文件出错,path:${path}, error: ${err}`);
                throw err;
            }
            callback(err, data);
        });
    },
    getAnimationListFilePath: function () {
        let date = dateUtil.getDateByFormat('yyyy-MM-dd');
        let filePath = `./public/static/data/animationListArray${date}.json`;
        // let filePath = `${__dirname}/../public/static/data/animationListArray${date}.json`;
        return filePath
    },
    getAnimationDetailFilePath: function () {
        let date = dateUtil.getDateByFormat('yyyy-MM-dd');
        let filePath = `./public/static/data/animationDetailArray${date}.json`;
        // let filePath = `${__dirname}/../public/static/data/animationDetailArray${date}.json`;
        return filePath
    },
    getAnimationDetailDBFilePath: function () {
        let date = dateUtil.getDateByFormat('yyyy-MM-dd');
        let filePath = `./public/static/data/animationDetailDBArray${date}.json`;
        // let filePath = `${__dirname}/../public/static/data/animationDetailDBArray${date}.json`;
        return filePath
    }
}

module.exports = fileUtil