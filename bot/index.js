const { WechatyBuilder } = require("wechaty");
const onScan = require("./listeners/on-scan");
const onMessage = require("./listeners/on-message");
const onLogin = require("./listeners/on-login");
const onRoomLeave = require("./listeners/on-room-leave");
const onRoomJoin = require("./listeners/on-room-join");

const bot = WechatyBuilder.build({
    name: "前端筱园机器人", // 名字随意
});

bot.on("scan", onScan);
bot.on("message", onMessage);
bot.on("login", onLogin);
bot.on("room-join", onRoomJoin);
// bot.on("room-leave", onRoomLeave);
bot.start();

module.exports = {
    bot
};
