const api = require("../proxy/api");
const { matchKeywordReply } = require("../utils");
const { findTalker } = require("./index");

/**
 *
 * @param {*} that
 * @param {*} name 发送者姓名
 * @param {*} id 发送着ID
 * @param {*} avatar 发送者头像
 * @returns
 */
async function getRoomTextReply(that, room, msg) {
    let replay = await matchKeywordReply(msg);
    return replay;
}

async function replayImage() {}

module.exports = {
    getRoomTextReply,
};
