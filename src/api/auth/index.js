const Router = require('koa-router');
const authCtrl = require('./auth.ctrl');
const auth = new Router();

auth.post('/register/local', authCtrl.localRegister);
auth.post('/login/local', authCtrl.localLogin);
auth.get('/exists/:key(email|id)/:value', authCtrl.exists);
auth.post('/logout', authCtrl.logout);
auth.get('/check', authCtrl.check);
auth.get('/user', authCtrl.user);

module.exports = auth;
