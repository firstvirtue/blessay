const Router = require('koa-router');
const authCtrl = require('./auth.ctrl');
const auth = new Router();

auth.post('/register/local', authCtrl.localRegister);
auth.post('/login/local', authCtrl.localLogin);
auth.get('/exists/:key(email|username)/:value', authCtrl.exists);
auth.post('/logout', authCtrl.logout);

module.exports = auth;
