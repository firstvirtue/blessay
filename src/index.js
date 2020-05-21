require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa2-static-middleware');
const bodyParser = require('koa-bodyparser');
// const { Pool } = require('pg');
const cors = require('koa2-cors');
const Knex = require('knex');
const { Model, ForeignKeyViolationError, ValidationError } = require('objection');

const knexConfig = require('./knexfile');
const { jwtMiddleware } = require('./lib/token');
const api = require('./api');

// Initialize knex.
const knex = process.env.NODE_ENV === 'production' ? Knex(knexConfig.production) : Knex(knexConfig.development);
Model.knex(knex);

const app = new Koa();
const router = new Router();

app.use(cors());
router.use('/api', api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);

router.get('/post-rsc-pool/*', serve(__dirname + '/../post-rsc-pool'));
router.get('/rsc/*', serve(__dirname + '/../rsc'));

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('listening to port 4000');
});
