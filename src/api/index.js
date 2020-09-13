const Router = require('koa-router');
const posts = require('./posts');
const auth = require('./auth');
const counsel = require('./counsel');
const tags = require('./tags');

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/counsel', counsel.routes());
api.use('/tags', tags.routes());

module.exports = api;
