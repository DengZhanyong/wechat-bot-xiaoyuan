const schedule = require("node-schedule");
const {
    getJuejinCrawlingMsg,
    getOneJoke,
    getHsltNew,
    getHsltZtgc,
    getTodayLeetCode,
    getRandomQuestion,
    getBoredFishing,
} = require("./replay");
const { HELP_TEXT } = require("./constant");

function setSchedule(date, callback) {
    let _date = date;
    if (typeof date === "object") {
        _date = new schedule.RecurrenceRule();
        for (const key in date) {
            _date[key] = date[key];
        }
    }

    schedule.scheduleJob(_date, callback);
}
/**
 * 延时函数
 * @param {*} ms 毫秒
 */
async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function matchKeywordReply(text) {
    let replay = "";
    // 全匹配
    switch (text) {
        case "帮助":
            replay = HELP_TEXT;
            break;
        case "打新股票":
            replay = await getHsltNew();
            break;
        case "涨停股票":
            replay = await getHsltZtgc();
            break;
        case "每日一题":
            replay = await getTodayLeetCode();
            break;
        case "随机出题":
            replay = await getRandomQuestion();
            break;
        case "无聊摸鱼":
        case "无聊网站":
        case "摸鱼网站":
            replay = await getBoredFishing();
            break;
    }
    if (replay) return replay;
    // 模糊匹配
    if (text.includes("笑话")) {
        return await getOneJoke();
    }
    if (text.includes("掘金")) {
        const count = text.match(/\d+/g)?.[0] || 3;
        return await getJuejinCrawlingMsg(
            `为你推荐${count}篇掘金文章：`,
            count
        );
    }
}

module.exports = {
    setSchedule,
    delay,
    matchKeywordReply,
};
