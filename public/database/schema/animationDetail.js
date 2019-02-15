let mongoose = require('../db');
let Schema = mongoose.Schema;

let AnimationDetailSchema = new Schema({
    season_id: '',
    title: '', // 番剧标题
    description: '', // 番剧简介
    coins: 0, // 硬币数量
    danmakus: 0, // 弹幕数量
    favorites: 0, // 追番人数
    views: 0 // 播放总数
});

module.exports = mongoose.model("AnimationDetail", AnimationDetailSchema);