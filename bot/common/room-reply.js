const api = require("../proxy/api");
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
    // room.say('1111', msg.);
}

async function replayImage() {}

module.exports = {
    getRoomTextReply,
};
