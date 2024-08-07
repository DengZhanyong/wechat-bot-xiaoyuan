// 本文件是配置案例文件，请拷贝一份此文件后重命名为config.js，否则项目无法运行
module.exports = {
    AUTOREPLY: false, // 是否设置机器人自动回复，默认关闭 false  开启为 true
    DEFAULTBOT: "0", // 默认机器人 0 天行机器人 1 天行对接的图灵机器人 2 图灵机器人
    TULINGKEY: "", //图灵机器人KEY
    MAIRUI_KEY: "120550757743451e6e",
    TXAPIKEY: "4cebe352636311f3650eb66f08520143", // 必填，天行数据key，目前贡献的是我个人的，建议申请自己的天行数据key，可以对机器人个性化定制
    SCHEDULE_LIST: [
        {
            name: "馒头老爸",
            endWord: "小助手前端筱园",
            date: "0 * * * * *",
        },
    ],
    // 纪念日每日提醒
    MEMORIAL_LIST: [
        {
            name: "馒头老爸",
            alias: "备注",
            memorialDay: "2016-09-17",
            content: "亲爱的小黄，今天是我们在一起的第[day]天！",
            date: "0 0 9 * * *",
        },
        {
            name: "黄晓颖",
            alias: "备注",
            memorialDay: "2016-09-17",
            content: "亲爱的小黄，今天是我们在一起的第[day]天！",
            date: "0 0 9 * * *",
        },
    ],
    // 掘金热点推送
    JUNJIN_CRAWING: [
        // {
        //     name: "前端筱园交流群",
        //     id: "@@6ab29397570b5672d1b53945432b5ce1326dc43682bf3de4dff4c3579afa4325",
        //     date: "0 0 11 * * *",
        //     count: 5,
        //     title: "今日推荐掘金文章：",
        // },
        // {
        //     name: "机器人开发",
        //     id: "@@f35ce467ab5e09848229ee29f345e103c368b1ca8fb9f83427e63647103d8d46",
        //     date: "0 55 10 * * *",
        //     count: 5,
        //     title: "今日推荐掘金文章：",
        // },
    ],
    LEETCODE_PUSH_LIST: [
        {
            name: "前端筱园交流群",
            id: "@@6ab29397570b5672d1b53945432b5ce1326dc43682bf3de4dff4c3579afa4325",
            date: "0 11 9 * * *",
        },
        {
            name: "机器人开发",
            id: "@@f35ce467ab5e09848229ee29f345e103c368b1ca8fb9f83427e63647103d8d46",
            date: "0 0 8 * * *",
        },
    ],
    // 下班倒计时提醒
    COUNTDOWN_WORK_LIST: [
        {
            time: "16:00",
            users: [
                {
                    name: "馒头老爸",
                },
            ],
            remindTimes: [30, 15, 0],
            date: {
                second: 0,
                dayOfWeek: [1, 2, 3, 4, 5],
            },
        },
        {
            time: "17:30",
            users: [
                {
                    name: "余登苗",
                },
            ],
            remindTimes: [30, 15, 0],
            date: "0 * * * * *",
            date: {
                second: 0,
                dayOfWeek: [1, 2, 3, 4, 5],
            },
        },
        {
            time: "17:15",
            users: [
                {
                    name: "黄晓颖",
                },
            ],
            date: {
                second: 0,
                dayOfWeek: [1, 2, 3, 4, 5],
            },
            remindTimes: [30, 15, 0],
        },
    ],

    WORK_REMIND_NOTE: [
        {
            time: 0,
            content: "下班时间到！记得关电脑哦！",
        },
        {
            time: 3,
            content: "最后3分钟，东西都收拾好了吗？",
        },
        {
            time: 5,
            content: "5分钟！5分钟！5分钟！",
        },
        {
            time: 10,
            content: "还有10分钟，准备准备，下班下班！",
        },
        {
            time: 64,
            content: "再坚持一下，还有71就下班了！",
        },
        {
            time: 60,
            content: "再坚持一下，还有1个小时就下班了！",
        },
        {
            time: 30,
            content: "还有最后半个小时就下班了",
        },
        {
            time: 15,
            content: "还有最后15分钟就下班了，可以开始准备收拾东西了哦！",
        },
    ],
    ARTICLE_RECOMMEND_ROOMS: [
        {
            name: "机器人开发",
            date: "0 * * * * *",
        },
    ],
    // FISHING_SITES_PUSH_LIST: [
    //     {
    //         name: "前端筱园交流群",
    //         id: "@@6ab29397570b5672d1b53945432b5ce1326dc43682bf3de4dff4c3579afa4325",
    //         date: {
    //             minute: 0,
    //             hour: 15,
    //             dayOfWeek: [1, 2, 3, 4, 5],
    //         },
    //         title: "----放松时间到----",
    //     },
    //     {
    //         name: "机器人开发",
    //         id: "@@f35ce467ab5e09848229ee29f345e103c368b1ca8fb9f83427e63647103d8d46",
    //         date: {
    //             minute: 35,
    //             hour: 15,
    //             dayOfWeek: [1, 2, 3, 4, 5],
    //         },
    //         title: "----放松时间到----",
    //     },
    // ],
};
