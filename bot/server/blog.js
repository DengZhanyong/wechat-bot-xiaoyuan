const Article = require("../model/BlogArticle");
const { Op } = require("sequelize");

async function queryArticles(search) {
    const data = await Article.findAndCountAll({
        attributes: {
            excludbe: ["isPrivate", "isDelete", "state", "authCode"],
        },
        where: {
            isPrivate: false,
            isDelete: false,
            state: 1,
            [Op.or]: {
                title: {
                    [Op.substring]: search,
                },
                // content: {
                //     [Op.substring]: search,
                // },
            },
        },
        order: [["createdAt", "desc"]],
    });
    data.rows.forEach((item) => {
        console.log(item.title);
    });
    return data.rows;
}

module.exports = { queryArticles };
