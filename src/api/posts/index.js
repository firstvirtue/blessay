const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');
const multer = require('@koa/multer');
const path = require('path');

const posts = new Router();
const storage = multer.diskStorage({
  destination: (req, file, callback) => {

    // console.log(req.headers.articleid);

    callback(null, 'uploads/');
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
posts.get('/:id', postsCtrl.read);
posts.get('/user/:user', postsCtrl.readUserArticles);
posts.post('/', postsCtrl.write);
posts.patch('/:id', postsCtrl.update);

// posts.put('/:id', postsCtrl.replace);
posts.delete('/:id', postsCtrl.delete);

posts.post('/upload', upload.single('postassets'), postsCtrl.upload);

module.exports = posts;
