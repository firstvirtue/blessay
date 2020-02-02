const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa2-static-middleware');
const bodyParser = require('koa-bodyparser');
const { Pool } = require('pg');
const cors = require('koa2-cors');

const api = require('./api');

const app = new Koa();
const router = new Router();

app.use(cors());
router.use('/api', api.routes());

app.use(bodyParser());

router.get('/uploads/*', serve(__dirname + '/../uploads'));

app.use(router.routes()).use(router.allowedMethods());

app.pool = new Pool({
  user: 'jakel',
  host: '45.77.17.225',
  database: 'blessay',
  password: 'lee',
  port: 5432
});

app.listen(4000, () => {
  console.log('listening to port 4000');
});
