require('dotenv').config();
const Koa = require('koa');
const http = require('http');
const https = require('https');
const Router = require('koa-router');
const serve = require('koa2-static-middleware');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const path = require('path');
const cors = require('koa2-cors');
const Knex = require('knex');
const { Model, ForeignKeyViolationError, ValidationError } = require('objection');

const knexConfig = require('./knexfile');
const { jwtMiddleware } = require('./lib/token');
const api = require('./api');

const PORT = process.env.PORT || 4001;

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

// app.listen(4000, () => {
//   console.log('listening to port 4000');
// });

const option =
process.env.NODE_ENV === 'production'
  ? {
    key: fs.readFileSync(path.resolve(__dirname, '../cert/privkey.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '../cert/fullchain.pem'))
  } :
  undefined;

http.createServer(app.callback()).listen(4000);

if(option) {
  https.createServer(option, app).listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
  });
}
