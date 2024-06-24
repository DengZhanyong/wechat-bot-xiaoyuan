const { DataTypes } = require("sequelize");
const db = require("../proxy/db");

const Article = db.define("blog_article", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
        comment: "文章内容",
    },
    tags: {
        type: DataTypes.TEXT,
        comment: "标签",
        get() {
            return this.getDataValue("tags").split(",");
        },
    },
    categorys: {
        type: DataTypes.TEXT,
        comment: "分类",
        get() {
            return (this.getDataValue("categorys") || "").split(",");
        },
    },
    isPrivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: "是否私有",
    },
    visits: {
        type: DataTypes.INTEGER,
        comment: "访问量",
    },
    likeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: "点赞数",
    },
    isTop: {
        type: DataTypes.BOOLEAN,
        comment: "是否置顶",
    },
    isDelete: {
        type: DataTypes.BOOLEAN,
        comment: "是否被删除",
    },
    coverImage: {
        type: DataTypes.TEXT,
        comment: "封面",
    },
    gzhUrl: {
        type: DataTypes.TEXT,
        comment: "公众号链接",
    },
    authCode: {
        type: DataTypes.TEXT,
        comment: "验证码",
    },
    fileMd5: {
        type: DataTypes.TEXT,
        comment: "下载文件MD5",
    },
    state: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: "状态：1发布、2草稿、3笔记",
    },
    releaseTime: {
        type: DataTypes.DATE,
    },
    modifyTime: {
        type: DataTypes.DATE,
    },
});

module.exports = Article;
