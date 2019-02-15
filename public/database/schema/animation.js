let mongoose = require('../db.js');
let Schema = mongoose.Schema;

let AnimationSchema = new Schema({
    area: { type: String },
    areaLimit: { type: Number },
    attention: { type: Number },
    bangumi_id: { type: Number },
    bgmcount: { type: String },
    cover: { type: String },
    danmaku_count: { type: Number },
    ep_id: { type: Number},
    favorites: { type: Number},
    is_finish: { type: Number},
    lastupdate: { type: Number},
    lastupdate_at: { type: String},
    new: { type: Boolean},
    play_count: { type: Number},
    pub_time: { type: String},
    season_id: { type: Number},
    session_status: { type: Number},
    spid: { type: Number},
    square_cover: { type: String},
    title: { type: String},
    viewRank: { type: Number},
    weekday: { type: Number}
});

module.exports = mongoose.model("Animation", AnimationSchema);