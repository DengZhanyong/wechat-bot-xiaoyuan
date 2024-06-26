const schedule = require("node-schedule");
const { getJuejinCrawlingMsg, getOneJoke } = require("./replay");

const HELP_TEXT = `目前支持发送关键词触发相应功能，包括：掘金热点、笑话`;

function setSchedule(date, callback) {
    schedule.scheduleJob(date, callback);
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
    }
    if (replay) return replay;
    // 模糊匹配
    if (text.includes("笑话")) {
        return await getOneJoke();
    }
    if (text.includes("掘金")) {
        const count = text.match(/\d+/g)?.[0] || 3;
        return await getJuejinCrawlingMsg("为你推荐掘金文章：", count);
    }
}

module.exports = {
    setSchedule,
    delay,
    matchKeywordReply,
};
