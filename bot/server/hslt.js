const config = require("../wechat.config");
const axios = require("axios");
const MAIRUI_KEY = config.MAIRUI_KEY;

async function fetchHsltNew() {
    return new Promise((resolve) => {
        axios
            .get(`http://api.mairui.club/hslt/new/${MAIRUI_KEY}`)
            .then((res) => {
                resolve(res.data);
            });
    });
}

// 获取涨停股票
async function fetchHsltZtgc(time) {
    return new Promise((resolve) => {
        axios
            .get(`http://api.mairui.club/hslt/ztgc/${time}/${MAIRUI_KEY}`)
            .then((res) => {
                resolve(res.data);
            });
    });
}

module.exports = { fetchHsltNew, fetchHsltZtgc };
