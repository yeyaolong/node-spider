const Animation = require("../schema/animation");
// var mongoose = require('mongoose');


const AnimationOperation = {
    insert: function (animation) {
        return new Promise((resolve, reject) => {
            let animationInsert = new Animation(animation);
            animationInsert.save(function (err, res) {
                if (err) {
                    console.error("插入新番列表失败");
                    reject()
                    throw err;
                } else {
                    console.log("插入新番列表成功");
                    resolve()
                }
            });
        });
    },
    insertOrUpdate: function (animation) {
      let _this = this;
      return new Promise((resolve, reject) => {
          let temp = _this.findBySeasonId(animation.season_id, function (res) {
              if (res && res.title) {
                  // 更新操作
                  _this.updateBySeasonId(animation.season_id, animation).then(() => {
                      resolve();
                  })
              } else {
                  // 插入操作
                  _this.insert(animation).then(() => {
                      resolve();
                  });
              }
          });
      });
    },
    updateBySeasonId: function (seasonId, animation) {
        return new Promise((resolve, reject) => {
            Animation.findOneAndUpdate({"season_id": seasonId}, animation, function (err) {
                if (err) {
                    console.error("更新新番列表出错");
                    reject();
                    throw err;
                }
                resolve();
                console.log("更新新番列表成功")
            });
        })

    },
    deleteBySeasonId:  function (seasonId) {
        Animation.find({"season_id": seasonId}, function (err, res) {
            if (err) {
                console.error("删除新番列表出错");
                throw err;
            }
            if (res) {
                res.remove();
            }
        });
    },
    findAll: function (callback) {
      Animation.find({}, function (err, res) {
          if (err) {
              console.error(`查询新番列表出错`);
              throw err;
          }
          if (callback && typeof callback === 'function') {
              callback(res);
          }
      });
    },
    sortBy: function (param, callback) {
        console.log('sortBy param', param);
        Animation.find({}).sort(param).exec(function (err, res) {
                if (err) {
                    console.error(`查询新番列表出错`);
                    throw err;
                }
                if (callback && typeof callback === 'function') {
                    callback(res);
                }
            }
        );
    },
    findBySeasonId: function (seasonId, callback) {
        Animation.findOne({"season_id": seasonId}, function (err, res) {
           if (err) {
               console.error(`查询出错: seaonId=${seasonId}`);
               throw err;
           }
           if (callback && typeof callback === 'function') {
               callback(res);
           }
        });
    }
}


module.exports = AnimationOperation
