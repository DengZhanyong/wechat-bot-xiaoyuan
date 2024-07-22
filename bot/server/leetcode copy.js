const axios = require("axios");

// 获取今日题目
async function fetchTodayLeetCode() {
    const url = "https://leetcode.cn/graphql/";
    return new Promise((resolve) => {
        axios
            .post(url, {
                query: "\n    query questionOfToday {\n  todayRecord {\n    date\n    userStatus\n    question {\n      questionId\n      frontendQuestionId: questionFrontendId\n      difficulty\n      title\n      titleCn: translatedTitle\n      titleSlug\n      paidOnly: isPaidOnly\n      freqBar\n      isFavor\n      acRate\n      status\n      solutionNum\n      hasVideoSolution\n      topicTags {\n        name\n        nameTranslated: translatedName\n        id\n      }\n      extra {\n        topCompanyTags {\n          imgUrl\n          slug\n          numSubscribed\n        }\n      }\n    }\n    lastSubmission {\n      id\n    }\n  }\n}\n    ",
                variables: {},
                operationName: "questionOfToday",
            })
            .then((res) => {
                try {
                    const data = res.data.data.todayRecord[0];
                    resolve(data);
                } catch (error) {
                    resolve("");
                }
            })
            .catch(() => {
                resolve("");
            });
    });
}

// 随机获取一题
async function fetchRandomLeetCodeQuestion() {
    const url = "https://leetcode.cn/graphql/";
    return new Promise((resolve) => {
        axios
            .post(url, {
                query: "\n    query problemsetRandomFilteredQuestion($categorySlug: String!, $filters: QuestionListFilterInput) {\n  problemsetRandomFilteredQuestion(categorySlug: $categorySlug, filters: $filters)\n}\n    ",
                variables: {
                    categorySlug: "javascript",
                    filters: {},
                },
                operationName: "problemsetRandomFilteredQuestion",
            })
            .then((res) => {
                try {
                    const data = res.data.data.problemsetRandomFilteredQuestion;
                    resolve(data);
                } catch (error) {
                    resolve("");
                }
            })
            .catch(() => {
                resolve("");
            });
    });
}

// 查询题目内容
async function fetchLeetCodeQuestionContent(titleSlug) {
    const url = "https://leetcode.cn/graphql/";
    return new Promise((resolve) => {
        axios
            .post(url, {
                query: "\n    query questionTranslations($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    translatedTitle\n    translatedContent\n  }\n}\n    ",
                variables: {
                    titleSlug: titleSlug,
                },
                operationName: "questionTranslations",
            })
            .then((res) => {
                try {
                    const data = res.data.data.question;
                    resolve(data);
                } catch (error) {
                    resolve("");
                }
            })
            .catch(() => {
                resolve("");
            });
    });
}

// 查询题目详情
async function fetchLeetCodeQuestionDetail(titleSlug) {
    const url = "https://leetcode.cn/graphql/";
    return new Promise((resolve) => {
        axios
            .post(url, {
                query: "\n    query questionTitle($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    title\n    titleSlug\n    isPaidOnly\n    difficulty\n    likes\n    dislikes\n    categoryTitle\n  }\n}\n    ",
                variables: {
                    titleSlug: titleSlug,
                },
                operationName: "questionTitle",
            })
            .then((res) => {
                try {
                    const data = res.data.data.question;
                    resolve(data);
                } catch (error) {
                    resolve("");
                }
            })
            .catch(() => {
                resolve("");
            });
    });
}

module.exports = {
    fetchTodayLeetCode,
    fetchRandomLeetCodeQuestion,
    fetchLeetCodeQuestionDetail,
    fetchLeetCodeQuestionContent,
};
