const Router = require('koa-router');
const counselCtrl = require('./counsel.ctrl');
const counsel = new Router();

counsel.post('/register', counselCtrl.register);

module.exports = counsel;
