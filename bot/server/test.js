const images = require("images");
const fs = require("fs");
const path = require("path");
// 读取原始图片和水印图片
const originalImage = path.join(__dirname, "../images/question.png");
const watermarkImage = path.join(__dirname, "../images/logo.png");

const watermarkImg = images(watermarkImage);
const wmWidth = watermarkImg.width();
const wmHeight = watermarkImg.height();

const filePath = "bot/images/questionHasLogo.png";
async function fn() {
    try {
        const sourceImg = images(originalImage);
        const sWidth = sourceImg.width();
        const sHeight = sourceImg.height();
        images(sourceImg)
            .draw(watermarkImg, sWidth - wmWidth - 5, sHeight - wmHeight - 5)
            .save(`questionHasLogo.png`);
        // fs.existsSync(filePath) && fs.unlinkSync(filePath);
        // fs.renameSync(path.join(__dirname, `../${newName}`), filePath);
    } catch (error) {
        console.log(error, "error");
    }
}
fn();
