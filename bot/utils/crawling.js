const axios = require("axios");

async function getJujinData() {
    const url =
        "https://api.juejin.cn/content_api/v1/content/article_rank?category_id=6809637767543259144&type=hot";

    return new Promise((resolve, reject) => {
        axios.get(url).then((res) => {
            try {
                const list = res.data.data.map((item) => {
                    const content = item.content;
                    return {
                        title: content.title,
                        articleId: content.content_id,
                        url: `https://juejin.cn/post/${content.content_id}`,
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

async function getJuejinCrawlingMsg() {
    const list = await getJujinData();
    if (!list.length) return "";
    let replay = "今日掘金热点文章推荐：";
    list.slice(0, 10).map((item, index) => {
        const { title, url } = item;
        replay += `\n${index + 1}、《${title}》${url}`;
    });
    return replay;
}

module.exports = {
    getJujinData,
    getJuejinCrawlingMsg,
};
