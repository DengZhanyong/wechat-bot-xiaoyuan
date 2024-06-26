const config = require("../wechat.config");
const axios = require("axios");
const TXAPIKEY = config.TXAPIKEY;

async function fetchJoke() {
    return new Promise((resolve) => {
        axios
            .get(`https://apis.tianapi.com/joke/index?key=${TXAPIKEY}&num=1`)
            .then((res) => {
                resolve(res.data.result);
            });
    });
}

module.exports = { fetchJoke };
