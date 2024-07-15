const puppeteer = require("puppeteer");
const { FileBox } = require("file-box");
async function websiteScreenshot(url, imagePath) {
    // 启动一个新的浏览器实例
    const browser = await puppeteer.launch({
        args: ["--no-sandbox"],
    });
    // 创建一个新的页面
    const page = await browser.newPage();
    await page.goto(url);
    await delay(1000);
    await page.screenshot({
        path: imagePath,
        fullPage: true,
    });
    await browser.close();
    return FileBox.fromFile(imagePath);
}

/**
 * 延时函数
 * @param {*} ms 毫秒
 */
async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { websiteScreenshot };
