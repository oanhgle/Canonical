const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')

const array = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

newsRouter.get('', async (req, res) => {

    try {
        const newsAPI = await axios.get(`https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json`);

        let articles = newsAPI.data;

        articles = articles.map((article) => {
            const date = new Date(article.date);
            const day = date.getDate();
            const month = array[date.getMonth()];
            const year = date.getFullYear();
            article.date = `${day} ${month} ${year}`;
            return article;
        });

        res.render('news', { articles: newsAPI.data })
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.error('Error', error.message);
        }
    }


});

module.exports = newsRouter