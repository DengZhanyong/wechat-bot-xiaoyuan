const { FileBox } = require("file-box");
const { findTalker, getFriendList, getRoomList, findRoom } = require(".");
const { queryArticles } = require("../server/blog");
const { getEmo } = require("../proxy/api");
const wechaty = require("wechaty");
const { UrlLinkImpl } = require("wechaty/impls");
const { getJujinData, replayJuejinCrawling } = require("../utils/crawling");

/**
 *
 * @param {*} that bot实例
 * @param {*} talker 对话者
 * @param {*} content 内容
 */
async function getContactTextReply(that, talker, content) {
    // const talker1 = await findTalker(that, "馒头老爸");
    // console.log(talker1);
    // await talker1.say("生生世世<>");
    // await getFriendList(that);
    // await queryArticles(content);
    // return "你好";
    // const emo = getEmo();
    // const rooms = await getRoomList(that);
    // room.say("私法消息转发到群聊：" + msg);
    // console.log(talker.id);
    // const sendRooms = ["机器人开发1"];
    // const rooms = await getRoomList(that);
    // rooms.forEach(async (room) => {
    //     console.log(room.id);
    //     const roomTopic = await room.topic();
    //     sendRooms.includes(roomTopic) && (await room.say(msg));
    // });
    // const room = await findRoom(that, msg);
    // if (!room) return "没有该群聊";
    // const inRoom = await room.member({ name: talker.name() });
    // await room.add(talker);
    // return inRoom ? "你已在群聊中" : "我即将拉你入群";
    // return `<a href="http://ik.jsztr77.shop/t/ReaM">点击加入交流群</a>`;
    // const linkPayload = msg.UrlLinkImpl({
    //     description: 'WeChat Bot SDK for Individual Account, Powered by TypeScript, Docker, and Love',
    //     thumbnailUrl: 'https://avatars0.githubusercontent.com/u/25162437?s=200&v=4',
    //     title: 'Welcome to Wechaty',
    //     url: 'https://github.com/wechaty/wechaty',
    // });
    const rooms = await getRoomList(that);
    let replay = "";
    switch (content) {
        case "掘金热点":
            replay = await getJuejinCrawlingMsg();
    }
    return replay;
}

module.exports = {
    getContactTextReply,
};
