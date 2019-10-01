const Router = require('koa-router');
const articleCtrl = require('./article.controller');
var multer = require('@koa/multer');

const article = new Router();

article.get('/', articleCtrl.getArticles);
article.get('/:articleId', articleCtrl.getArticle);
article.get('/:articleId/:elementId', articleCtrl.getElement);

article.post('/', multer({dest:'tmp/uploads/'}).single('myfile'), articleCtrl.createArticle);
article.post('/:articleId', multer({ dest:'tmp/uploads/' }).single('recfile'), articleCtrl.createElement);

// article.patch('/:id', articleCtrl.updateArticle);
// article.patch('/:id/:id', articleCtrl.updateElement);

// article.delete('/:id', articleCtrl.deleteArticle);
// article.delete('/:id/:id', articleCtrl.deleteElement);

module.exports = article;
