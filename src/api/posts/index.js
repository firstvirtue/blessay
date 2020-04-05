const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');
const multer = require('@koa/multer');
const path = require('path');
const mkdirp = require('mkdirp');

const posts = new Router();
const storage = multer.diskStorage({
  destination: (req, file, callback) => {

    callback(null, 'post-rsc-pool/');
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'));
    }
    callback(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});

const printInfo = (ctx) => {
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params
  };
};

posts.get('/', postsCtrl.list);
posts.get('/:categoryId', postsCtrl.listByCategory);
// posts.get('/:id', postsCtrl.read);
posts.get('/read/:id', postsCtrl.read);
posts.get('/user/:user', postsCtrl.readUserArticles);

posts.post('/', postsCtrl.write);
posts.patch('/:id', postsCtrl.update);

// posts.put('/:id', postsCtrl.replace);
posts.delete('/:id', postsCtrl.delete);

posts.post('/upload', upload.single('post-rsc-pool'), postsCtrl.upload);

module.exports = posts;
