const Router = require('koa-router');
const posts = require('./posts');
const auth = require('./auth');
const counsel = require('./counsel');

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/counsel', counsel.routes());

module.exports = api;
