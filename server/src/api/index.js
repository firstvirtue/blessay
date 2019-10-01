const Router = require('koa-router');

const api = new Router();
const article = require('./article');

api.use('/article', article.routes());

module.exports = api;
