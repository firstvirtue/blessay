require('dotenv').config(); // .env 파일에서 환경변수 불러오기

const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors'); // CORS policy

const app = new Koa();
const router = new Router();
const api = require('./api');

const mongoose = require('mongoose');
// const koaBody = require('koa-body');

app.use(cors());

mongoose.Promise = global.Promise; // Node 의 네이티브 Promise 사용
// mongodb 연결
const con = process.env.MONGO_URI || 'mongodb://45.77.17.225:27017/community';
mongoose.connect(con, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  (response) => {
    console.log('Successfully connected to mongodb');
  }
).catch(e => {
  console.error(e);
});

// app.use(koaBody());

router.use('/api', api.routes()); // api 라우트를 /api 경로 하위 라우트로 설정
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 4000; // PORT 값이 설정되어있지 않다면 4000 을 사용합니다.

app.listen(port, () => {
  console.log('server is listening to port ' + port);
});
