const Router = require('koa-router');
const tagsCtrl = require('./tags.ctrl');

const tags = new Router();

tags.get('/', tagsCtrl.list);
tags.post('/', tagsCtrl.write);
tags.delete('/:id', tagsCtrl.delete);

module.exports = tags;
