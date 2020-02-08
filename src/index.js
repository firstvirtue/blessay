const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa2-static-middleware');
const bodyParser = require('koa-bodyparser');
// const { Pool } = require('pg');
const cors = require('koa2-cors');

const api = require('./api');

const Knex = require('knex');
const knexConfig = require('./knexfile');
const { Model, ForeignKeyViolationError, ValidationError } = require('objection');

// Initialize knex.
const knex = Knex(knexConfig.development);
Model.knex(knex);

const app = new Koa();
const router = new Router();

app.use(cors());
router.use('/api', api.routes());

app.use(bodyParser());

router.get('/uploads/*', serve(__dirname + '/../uploads'));

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('listening to port 4000');
});
