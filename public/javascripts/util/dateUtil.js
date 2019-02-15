
const DateUtil = {
    getDateByFormat: function (format = "yyyy-MM-dd") {
        let date = new Date()
        let dateStr = ''
        let year = date.getFullYear();
        let month = (date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
        let day = (date.getDate() > 10) ? (date.getDate()) : '0' + (date.getDate());
        let hour = date.getHours() > 10 ? date.getHours() : '0' + date.getHours();
        let minutes = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes();
        let seconds = date.getSeconds() > 10 ?  date.getSeconds() : '0' + date.getSeconds();
        switch(format) {
            case 'yyyy-MM-dd':
                dateStr = `${year}-${month}-${day}`
                break;
            case 'yyyy-MM-dd HH:mm:ss':
                dateStr = `${year}-${month}-${day} ${hour}：${minutes}：${seconds}`;
                break
            default:
                dateStr = `${year}-${month}-${day}`
                break;
        }
        return dateStr
    },
    getSeasonType: function () {
        // 获取季度(1季度，2季度,3季度,4季度)
        // 没有研究过B站番剧的季度是怎么区分的。
        // 从二次元的角度来说，有一月新番，七月新番，...之类的说法，似乎并不是完全按照季节来区分的
        // 我这里用比较常规的按照月份区分季度了
        let season_type;
        let date = new Date();
        let month = date.getMonth() + 1;
        if (month >=1 && month <=3) {
            season_type = 1;
        } else if (month >= 4 && month <=6) {
            season_type = 2;
        } else if (month >= 7 && month <= 9) {
            season_type = 3;
        } else if (month >= 10 && month <= 12) {
            season_type = 12;
        }
         return season_type;
    }
}

module.exports = DateUtil