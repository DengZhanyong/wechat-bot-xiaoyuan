const qrcodeTerminal = require("qrcode-terminal");
const { ScanStatus, log } = require("wechaty");

function onScan(qrcode, status) {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
        const qrcodeImageUrl = [
            "https://wechaty.js.org/qrcode/",
            encodeURIComponent(qrcode),
        ].join("");
        log.info(
            "StarterBot",
            "onScan: %s(%s) - %s",
            ScanStatus[status],
            status,
            qrcodeImageUrl
        );
        // 在控制台中显示二维码
        qrcodeTerminal.generate(qrcode, { small: true });
    } else {
        log.info("StarterBot", "onScan: %s(%s)", ScanStatus[status], status);
    }
}

module.exports = onScan;
