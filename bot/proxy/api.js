const { FileBox } = require("file-box");
/**
 * 获取表情包
 * @param {*} msg
 */
async function getEmo(msg) {
    return FileBox.fromUrl(
        "http://dl.weshineapp.com/gif/20190902/401ed8e703984d504ca1e49ffd4ed8ac.jpg"
    );
}

module.exports = {
    getEmo,
};
