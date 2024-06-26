const axios = require("axios");
const { fetchJoke } = require("../server/tianxing");

async function getJujinData() {
    const url =
        "https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?aid=2608&uuid=7325330460455618099&spider=0&verifyFp=verify_lwhei6ci_d1EAhBVn_loAL_4btt_9A0e_QiuizICUjdrI&fp=verify_lwhei6ci_d1EAhBVn_loAL_4btt_9A0e_QiuizICUjdrI&msToken=oWv-lru4shRsfLY18G8Vey04aransuatDNq_tX7dqy0c9fUopqff6FXuG14u7kKi8ve1ta8uQilt1vEb6juJcCaSUwMqskyz57o-wiCyIJmzPWuAGAbUI3-DIMo1EF0T&a_bogus=mJlQvOZQMsm16PW2BXDz9bKt7A80YW4ggZENok398Uom";
    return new Promise((resolve, reject) => {
        axios
            .post(url, {
                cate_id: "6809637767543259144",
                cursor: "0",
                id_type: 2,
                limit: 20,
                sort_type: 200,
            })
            .then((res) => {
                try {
                    const list = res.data.data.map((item) => {
                        const article_info = item.article_info;
                        const { title, article_id, digg_count } = article_info;
                        return {
                            title: title,
                            articleId: article_id,
                            url: `https://juejin.cn/post/${article_id}`,
                            digg_count,
                        };
                    });
                    resolve(list);
                } catch (error) {
                    console.error("掘金热点数据爬取失败");
                    resolve([]);
                }
            });
    });
}

async function getJuejinCrawlingMsg(title, count) {
    const list = await getJujinData();
    if (!list.length) return "";
    let replay = title;
    list.slice(0, count).map((item, index) => {
        const { title, url, digg_count } = item;
        replay += `\n\n${index + 1}、《${title}》 ${url}`;
    });
    return replay;
}

async function getOneJoke() {
    const result = await fetchJoke();
    const joke = result.list[0];
    return `《${joke.title}》\n${joke.content}`;
}

module.exports = {
    getJujinData,
    getJuejinCrawlingMsg,
    getOneJoke,
};
