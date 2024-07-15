const axios = require("axios");
const { fetchJoke } = require("../server/tianxing");
const { fetchHsltNew, fetchHsltZtgc } = require("../server/hslt");
const dayjs = require("dayjs");
const {
    fetchTodayLeetCode,
    fetchLeetCodeQuestionDetail,
    fetchRandomLeetCodeQuestion,
} = require("../server/leetcode");
const puppeteer = require("puppeteer");
const { FileBox } = require("file-box");
const { BoredFishingSitesList } = require("./constant");
const { websiteScreenshot } = require("./website");

const questionImage = "bot/images/question.png";

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
    if (!list.length) return "文章获取失败，请重新尝试！";
    let replay = title;
    list.slice(0, count).map((item, index) => {
        const { title, url, digg_count } = item;
        replay += `\n\n${index + 1}、《${title}》 ${url}`;
    });
    return replay;
}

// 打新股票
async function getHsltNew() {
    const list = await fetchHsltNew();
    const today = dayjs().format("YYYY-MM-DD");
    const fu = list.filter((item) => item.sgrq >= today);
    let text = "近期打新股票：";
    fu.forEach((item) => {
        text += `\n\n${item.zqjc}(${item.zqdm})\n申购日期：${
            item.sgrq || "未知"
        }\n上市日期：${item.ssrq || "未知"}\n发行价格：${
            item.fxjg || "未知"
        }\n中签号公布日：${item.zqgbrq}\n中签率：${item.wszql || "未知"}`;
    });
    return text;
}

// 涨停股票消息
async function getHsltZtgc() {
    const today = dayjs().format("YYYY-MM-DD");
    const list = await fetchHsltZtgc(today);
    let text = "今日涨停股票：";
    list.forEach((item) => {
        const [x, y] = item.tj.split("/");
        text += `\n\n${item.mc}(${item.dm})${y}天${x}板\n价格：${item.p}\n最后封板时间：${item.lbt}\n首次封板时间：${item.fbt}`;
    });
    return text;
}

async function getOneJoke() {
    const result = await fetchJoke();
    const joke = result.list[0];
    return `《${joke.title}》\n${joke.content}`;
}

// 获取今天LeetCode题目
async function getTodayLeetCode() {
    const data = await fetchTodayLeetCode();
    if (!data) return "";
    const question = data.question;
    const { titleCn, titleSlug, difficulty, acRate } = question;
    const detail = await fetchLeetCodeQuestionDetail(titleSlug);
    if (!detail) return "";
    // 截图
    const { translatedTitle, translatedContent } = detail;

    let difficultyCn = "未知";
    console.log(difficulty);
    switch (difficulty) {
        case "Hard":
            difficultyCn = "困难";
            break;
        case "Medium":
            difficultyCn = "中等";
            break;
        case "Easy":
            difficultyCn = "简单";
            break;
        default:
            break;
    }
    await htmlText2Image(
        `<h1>${translatedTitle}&nbsp;&nbsp;<span style="font-size:18px;font-weight:400">难度：${difficultyCn}&nbsp;&nbsp;通过率：${Number(
            acRate * 100
        ).toFixed(2)}%</span></h1>${translatedContent}
        <div style="text-align:center;">
            <img src="https://resource.dengzhanyong.com/images/9ce7efc7-d880-470d-8864-9c29e242c4f5.png" style="height:120px;"/>
        </div>`
    );
    const imagePath = questionImage;
    const imageFileBox = FileBox.fromFile(imagePath);
    const url = `https://leetcode.cn/problems/${titleSlug}/description`;
    const text = `----每日一题----\n题目：${titleCn}\n难度：${difficultyCn}\n通过率：${Number(
        acRate * 100
    ).toFixed(2)}%\n解题地址：${url}`;
    return [imageFileBox, text];
}

// 获取今天LeetCode题目
async function getRandomQuestion() {
    const data = await fetchRandomLeetCodeQuestion();
    if (!data) return "";
    console.log(data);
    const question = data.question;
    const { title, titleCn, titleSlug, difficulty, acRate } = question;
    const detail = await fetchLeetCodeQuestionDetail(titleSlug);
    if (!detail) return "";
    // 截图
    const { translatedTitle, translatedContent } = detail;
    await htmlText2Image(
        `<h1>${translatedTitle}<span style="font-size:18px;">难度：${difficultyCn}&nbsp;&nbsp;通过率：${Number(
            acRate * 100
        ).toFixed(2)}%</span></h1>
        ${translatedContent}<p style="text-align:right">前端筱园交流群</p>`
    );
    const imagePath = questionImage;
    const imageFileBox = FileBox.fromFile(imagePath);
    let difficultyCn = "简单";
    switch (difficulty) {
        case "Hard":
            difficultyCn = "困难";
            break;
        case "MEDIUM":
            difficultyCn = "中等";
            break;
        case "EASY":
            difficultyCn = "简单";
            break;
        default:
            break;
    }
    const url = `https://leetcode.cn/problems/${titleSlug}/description`;
    const text = `----每日一题----\n题目：${titleCn}\n难度：${difficultyCn}\n通过率：${Number(
        acRate * 100
    ).toFixed(2)}%\n解题地址：${url}`;
    return [imageFileBox, text];
}

async function htmlText2Image(content) {
    // 启动一个新的浏览器实例
    const browser = await puppeteer.launch({
        args: ["--no-sandbox"],
    });
    // 创建一个新的页面
    const page = await browser.newPage();
    // 设置要渲染的HTML内容;
    const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Example HTML</title>
            <style>
                pre {
                    white-space: pre-wrap;
                }
            </style>
          </head>
          <body>
            ${content}
          </body>
        </html>
      `;
    // 将HTML内容设置为页面的内容
    await page.setContent(htmlContent);
    // 将页面渲染为图片并保存到文件
    await page.screenshot({
        path: questionImage,
        fullPage: true,
    });
    // 关闭浏览器
    await browser.close();
}

// 获取无聊摸鱼网站
async function getBoredFishing() {
    const len = BoredFishingSitesList.length;
    const index = Math.floor(Math.random() * len);
    const url = BoredFishingSitesList[index];
    const screenshot = await websiteScreenshot(
        url,
        `bot/images/websiteScreenshot_${index}.png`
    );
    return [`为你随机推荐一个放松摸鱼网站：${url}`, screenshot];
}

module.exports = {
    getJujinData,
    getJuejinCrawlingMsg,
    getOneJoke,
    getHsltNew,
    getHsltZtgc,
    getTodayLeetCode,
    getRandomQuestion,
    getBoredFishing,
};
