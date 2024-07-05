const { isArray } = require("lodash");
const { findContact, findRoom } = require("../common");
const { setSchedule } = require("../utils");
const { getJuejinCrawlingMsg, getTodayLeetCode } = require("../utils/replay");
const config = require("../wechat.config");
const dayjs = require("dayjs");

/**
 * 下班倒计时提醒
 * @param {*} that
 */
async function initWorkTask(that) {
    console.log("开启下班倒计时提醒");
    const list = config.COUNTDOWN_WORK_LIST;
    if (list.length) {
        const normalNotes = config.WORK_REMIND_NOTE;
        for (const item of list) {
            const { time, users, date, remindTimes, notes = [] } = item;
            setSchedule(date, async () => {
                const dateTime = `${dayjs().format("YYYY-MM-DD")} ${time}:00`;
                const diff = dayjs(dayjs(dateTime)).diff(dayjs());
                const minute = Math.floor(diff / 1000 / 60) + 1;
                const note =
                    notes.find((n) => n.time === minute) ||
                    normalNotes.find((n) => n.time === minute);
                // 配置了提醒时间的时间点才发送提醒
                if (
                    note &&
                    (remindTimes.length === 0 || remindTimes.includes(minute))
                ) {
                    for (const user of users) {
                        const contact = await findContact(that, user.name);
                        contact && contact.say(note.content);
                    }
                }
            });
        }
    }
}

/**
 * 纪念日每日提醒
 * @param {*} that
 */
async function initMemorialTask(that) {
    console.log("开启纪念日定时提醒");
    const list = config.MEMORIAL_LIST;
    if (list.length) {
        for (const item of list) {
            const { name, alias, memorialDay, content, date } = item;
            setSchedule(date, async () => {
                const contact = await findContact(that, name);
                if (contact) {
                    const diff = dayjs().diff(dayjs(memorialDay));
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const replay = content.replace("[day]", days);
                    contact.say(replay);
                }
            });
        }
    }
}

/**
 * 文章推荐
 * @param {*} that
 */
async function articlesRecommend(that) {
    console.log("开启掘金热点文章推荐");
    const list = config.JUNJIN_CRAWING;
    if (list.length) {
        for (const item of list) {
            const { title, name, date, count } = item;
            setSchedule(date, async () => {
                const message = await getJuejinCrawlingMsg(title, count);
                const room = await findRoom(that, name);
                if (room && message) {
                    room.say(message);
                }
            });
        }
    }
}

/**
 * 每日一题推荐
 * @param {*} that
 */
async function articlesRecommend(that) {
    console.log("开启每日一题推荐");
    const list = config.LEETCODE_RECOMMEND;
    if (list.length) {
        for (const item of list) {
            const { title, name, date, count } = item;
            setSchedule(date, async () => {
                const message = await getTodayLeetCode();
                const room = await findRoom(that, name);
                if (room && message) {
                    if (isArray(message)) {
                        for (const item of message) {
                            await room.say(item);
                        }
                    } else {
                        room.say(message);
                    }
                }
            });
        }
    }
}

/**
 * 初始化定时任务
 * @param {*} that
 */
async function initSchedule(that) {
    initMemorialTask(that);
    initWorkTask(that);
    articlesRecommend(that);
}

/**
 * 添加群监控
 */
async function roomListener(that) {
    const xiaoyuan = await that.Room.find({ topic: "前端筱园交流群" });
    if (xiaoyuan) {
        console.log("开启群监控");
        xiaoyuan.on("join", (room, contact) => {
            console.log("有人加入了群聊");
            console.log(room, contact);
        });
        xiaoyuan.on("leave", (room, contact) => {
            console.log("有人离开了群聊");
            console.log(room, contact);
        });
    }
}

async function onLogin(user) {
    console.log(`${user} 登录成功`);
    setTimeout(() => {
        initSchedule(this);
        // roomListener(this);
    }, 5000);
}

module.exports = onLogin;
