const AnimationDetail = require('../schema/animationDetail');

const AnimationDetailOperation = {
    insert: function (animationDetail) {
        return new Promise((resolve, reject) => {
            let animationDetailInsert = new AnimationDetail(animationDetail);
            animationDetailInsert.save(function (err, res) {
                if (err) {
                    console.error(`插入番剧详情失败`);
                    reject();
                    throw err;
                }
                console.log(`插入番剧详情成功`);
                resolve();
            })
        });
    },
    insertOrUpdate: function (animationDetail) {
        let _this = this
        return new Promise((resolve, reject) => {
            if (animationDetail && typeof animationDetail.season_id === 'number') {
                this.findBySeasonId(animationDetail.season_id, function (res) {
                    if (res && res.title && res.title.length > 0) {
                        // 数据库中已经存在，执行更新操作
                        _this.updateBySeasonId(animationDetail.season_id, animationDetail).then(() => {
                            resolve();
                        });
                    } else {
                        // 数据库中不存在，执行插入操作
                        _this.insert(animationDetail).then(() => {
                            resolve();
                        });
                    }
                });
            }
        });

    },
    delete: function () {},
    updateBySeasonId: function (seasonId, animationDetail) {
        return new Promise((resolve, reject) => {
            AnimationDetail.findOneAndUpdate({"season_id": seasonId}, animationDetail, {multi: true}, function (err) {
                if (err) {
                    console.error(`更新番剧详情失败seasonId:${seasonId}`);
                    reject();
                    throw err;
                }
                console.log(`更新番剧详情成功`);
                resolve()
            })
        });
    },
    findAll: function () {
        AnimationDetail.find({}, function (err, res) {
            if (err) {
                console.error(`查询番剧详情失败`);
                throw err;
            }
            console.log(`查询番剧详情成功`);
            return res;
        });
    },
    findBySeasonId: function (seasonId, callback) {
        AnimationDetail.findOne({'season_id': seasonId}, function (err, res) {
            if (err) {
               console.error(`查询番剧详情失败`);
               throw err;
            }
            if (callback && typeof callback === 'function') {
                callback(res)
            }
        });
    }
}

module.exports = AnimationDetailOperation;