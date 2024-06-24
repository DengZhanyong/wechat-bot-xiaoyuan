const dayjs = require("dayjs");

/**
 * 加入群聊
 * @param {*} room
 * @param {*} contact
 */
async function onRoomJoin(room, inviteeList, inviter) {
    const nameList = inviteeList.map((member) => member.name()).join(", ");
    room.say(`欢迎${nameList}加入了群聊！`);
}

module.exports = onRoomJoin;
