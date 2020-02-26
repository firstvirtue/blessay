const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');
const multer = require('@koa/multer');

const posts = new Router();
const storage = multer.diskStorage({
  destination: (req, file, callback) => {

    console.log(req.headers.articleid);

    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

const printInfo = (ctx) => {
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params
  };
};

posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);
posts.get('/:id', postsCtrl.read);
posts.patch('/:id', postsCtrl.update);

// posts.put('/:id', postsCtrl.replace);
posts.delete('/:id', postsCtrl.delete);

posts.post('/upload', upload.single('cximage'), postsCtrl.upload);

module.exports = posts;
