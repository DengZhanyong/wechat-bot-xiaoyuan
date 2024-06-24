const { log } = require("wechaty");
const { getContactTextReply } = require("../common/contact-reply");
const { getRoomTextReply } = require("../common/room-reply");

async function dispatchFriendFilterByMsgType(that, msg) {
    try {
        const type = msg.type(); // 消息类型
        const talker = msg.talker();
        // 是否是公众号消息
        const isOfficial = talker.type() === that.Contact.Type.Official;
        switch (type) {
            case that.Message.Type.Text:
                const content = msg.text();
                log.info(
                    `发消息人${await talker.name()}:发了一个文本：${content}`
                );
                // 不是公众号消息
                if (!isOfficial) {
                    reply = await getContactTextReply(
                        that,
                        talker,
                        content,
                        msg
                    );
                    if (reply) {
                        talker.say(reply);
                    }
                }
                break;
            case that.Message.Type.Emoticon:
                log.info(`发消息人${await talker.name()}:发了一个表情`);
                break;
            case that.Message.Type.Image:
                log.info(`发消息人${await talker.name()}:发了一个图片`);
                break;
            case that.Message.Type.Url:
                log.info(`发消息人${await talker.name()}:发了一个链接`);
                break;
            case that.Message.Type.Video:
                log.info(`发消息人${await talker.name()}:发了一个视频`);
                break;
            case that.Message.Type.Audio:
                log.info(`发消息人${await talker.name()}:发了一个音频`);
                break;
            case that.Message.Type.Recalled:
                log.info(`抓到 ${await talker.name()} 撤回了一条消息`);
                break;
            default:
                break;
        }
    } catch (error) {
        log.error(error);
    }
}

async function dispatchRoomFilterByMsgType(that, room, msg) {
    const type = msg.type(); // 消息类型
    const talker = msg.talker(); // 发送着
    const roomName = await room.topic(); // 群聊名称
    const talkerName = talker.name(); // 发送消息的人
    const mentionSelf = await msg.mentionSelf(); // 是否@了我
    const talkerId = talker.id; // 发送人ID
    const talkerAvatar = await talker.avatar(); // 发送人头像
    // 只处理文本消息
    if (type === that.Message.Type.Text) {
        let content = msg.text();
        if (mentionSelf) {
            // 获取@我的话
            content = content.replace(/@[^,，：:\s@]+/g, "").trim();
            const reply = await getRoomTextReply(that, room, msg);
            room.say(reply, talkerId);
            // if (typeof reply === "object") {
            //     room.say(reply);
            // }
        }
    }
}

async function onMessage(msg) {
    const room = msg.room(); // 是否为群消息
    const msgSelf = msg.self(); // 是否自己发给自己的消息
    if (msgSelf) return;
    if (room) {
        // await dispatchRoomFilterByMsgType(this, room, msg);
    } else {
        await dispatchFriendFilterByMsgType(this, msg);
    }
}

module.exports = onMessage;
