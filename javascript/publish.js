const NodeSSH = require("node-ssh");
const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");
const { exec } = require("child_process");
const ora = require("ora");
const fs = require("fs");
const pkg = require("../package.json");

const ssh = new NodeSSH();

const server = {
    host: "47.243.23.57",
    username: "root",
    password: "WAN1996dzy",
};
const TAR_NAME = `${pkg.name}-v${pkg.version}.tgz`; // 打包后的压缩包名称
const LOCAL_FILE_PATH = path.join(__dirname, `../${TAR_NAME}`); // 本地压缩包路径ls

const remoteBasePath = `/project/service/${pkg.name}`; // 服务器根目录
const remoteTarPath = `${remoteBasePath}/${TAR_NAME}`; // 服务器压缩包路径

const runConfig = [
    // {
    //   command: "rm -rf ./package",
    //   cwd: remoteBasePath,
    //   spinText: "删除原文件",
    // },
    {
        command: `tar -zxvf ${TAR_NAME}`,
        cwd: remoteBasePath,
        spinText: "解压文件",
    },
    {
        command: `rm -rf ${TAR_NAME}`,
        cwd: remoteBasePath + "/",
        spinText: "删除压缩包",
    },
    // {
    //   command: `nvm use 16`,
    //   cwd: remoteBasePath + "/",
    //   spinText: "设置node版本",
    // },
    {
        command: "npm install",
        cwd: `${remoteBasePath}/package`,
        spinText: "安装依赖",
    },
    {
        command: "pm2 start ecosystem.config.js",
        cwd: `${remoteBasePath}/package`,
        spinText: "启动项目",
    },
    // {
    //     command: "pm2 log wechart-bot",
    //     cwd: `${remoteBasePath}/package`,
    //     spinText: "输出日志",
    // },
];

async function runSSH() {
    let i = 0;
    while (i < runConfig.length) {
        const config = runConfig[i];
        // eslint-disable-next-line no-await-in-loop, no-plusplus, no-use-before-define, no-unused-expressions
        await execCommand(config);
        i += 1;
    }
}

function getSpin(text = "") {
    return ora({
        text,
        color: "cyan",
    });
}

async function execCommand({ command, cwd, spinText }) {
    const spin = getSpin(spinText);
    spin.start();
    await ssh
        .execCommand(command, {
            cwd,
        })
        .then((rs) => {
            const { stderr, code } = rs;
            if (code !== null && stderr) {
                spin.fail(spinText);
                console.error(stderr);
                process.exit(1);
            } else {
                spin.succeed();
            }
        });
}

function execTask(task, spinText) {
    const spin = getSpin(spinText);
    return new Promise((resolve, reject) => {
        spin.start();
        exec(task, (error) => {
            if (error) {
                reject(error);
                spin.fail();
            } else {
                spin.succeed();
                resolve("execTask successfully!");
            }
        });
    });
}

function connectServer() {
    const spin = getSpin("链接服务器");
    spin.start();
    return ssh
        .connect(server)
        .then(() => {
            spin.succeed();
        })
        .catch((err) => {
            spin.fail();
            console.log(
                chalk.red(`连接到【${server.host}】失败,请确保服务器ip正确`)
            );
            console.error(err);
            process.exit(1);
        });
}

async function putFile() {
    // 备份原来的配置文件
    // await execCommand({
    //     command: 'cp config.json config.json.bak',
    //     cwd: `${remoteBasePath}${REMOTE_WEB_PATH}/`,
    //     spinText: '备份配置文件'
    // });
    const spin = getSpin("上传到服务器");
    spin.start();
    return ssh
        .putFile(LOCAL_FILE_PATH, remoteTarPath)
        .then(() => {
            spin.succeed();
        })
        .catch((err) => {
            spin.fail();
            console.error(err);
            process.exit(1);
        });
}

async function settingConfig() {
    const needUpdateNodeModules = await inquirer
        .prompt([
            {
                type: "list",
                message: chalk.italic("是否要更新依赖:"),
                choices: [
                    {
                        name: "是",
                        value: true,
                    },
                    {
                        name: "否",
                        value: false,
                    },
                ],
                name: "updateNodeModules",
            },
        ])
        .then((as) => as.host);
    // const serverHost = await inquirer
    //   .prompt([
    //     {
    //       type: "input",
    //       message: chalk.italic("请输入要部署的服务器:"),
    //       default: server.host,
    //       name: "host",
    //     },
    //   ])
    //   .then(as => as.host);
    // const serverPassword = await inquirer
    //   .prompt([
    //     {
    //       type: "input",
    //       message: chalk.italic("密码:"),
    //       default: server.password,
    //       name: "password",
    //     },
    //   ])
    //   .then(as => as.password);
    // // 服务器根路径
    // remoteBasePath = await inquirer
    //   .prompt([
    //     {
    //       type: "list",
    //       message: chalk.italic("选择服务器根目录"),
    //       choices: ["/project/service"],
    //       name: "basePath",
    //     },
    //   ])
    //   .then(as => as.basePath);
    // server.host = serverHost;
    // server.password = serverPassword;
    if (fs.existsSync(LOCAL_FILE_PATH)) {
        fs.unlink(LOCAL_FILE_PATH, (err) => {
            if (err) {
                console.error(`删除文件失败: ${err}`);
            } else {
                console.log("文件删除成功");
            }
        });
    }

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
        await execTask("yarn pack", "压缩");
        resolve();
    });
}

async function pack() {
    return new Promise((resolve, reject) => {
        const spin = getSpin("打包");
        spin.start();
        exec("yarn pack", (error, stdout, stderr) => {
            if (error) {
                spin.fail();
                console.error(`打包时发生错误：${error}`);
                reject();
            }
            spin.succeed();
            resolve();
        });
    });
}

async function publish() {
    // await settingConfig(); // 设置配置信息
    await pack();
    await connectServer(); // 链接服务器
    await putFile(); // 上传项目到服务器
    await runSSH(); // 服务器操作
    console.log(chalk.green("---------项目部署成功---------"));
    process.exit(1);
}

publish();
