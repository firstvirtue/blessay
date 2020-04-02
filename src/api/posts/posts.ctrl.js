const Article = require('../../model/article');
const Block = require('../../model/block');
const FileManager = require('../../lib/fileManager');
const fs = require('fs');

exports.list = async (ctx) => {

  const res = await Article.query().select('*').orderBy('created_on');

  console.log(res);

  ctx.body = res;
}

exports.read = async (ctx) => {

  const id = ctx.params.id;

  const res = await Article.query()
    .eager('blocks')
    .where('id', id)
    .first();

  ctx.body = res;
}

exports.readUserArticles = async (ctx) => {
  const username = ctx.params.user;

  const res = await Article.query()
    // .eager('blocks')
    .select('*')
    .where('writer', username)
    .orderBy('created_on');

  ctx.body = res;
}

exports.write = async (ctx) => {
  const { user } = ctx.request;

  const data = ctx.request.body;

  data.writer = user.profile.username;

  const trx = await Article.startTransaction();

  let article;
  try {
    article = await Article.query().insertGraph({
      title: data.title,
      writer: data.writer,
      description: data.description,
      thumbnail: data.thumbnail,
      category: data.category,
      published: data.published,
      created_on: new Date().toISOString(),
      updated_on: new Date().toISOString(),
      blocks: data.blocks
    });

    await trx.commit();
  } catch (err) {
    console.log(`catch: ${err}`);
    await trx.rollback();
    throw err;
  }

  // console.log(article);

  ctx.body = article;
}

exports.update = async (ctx) => {
  const {
    id
  } = ctx.params;

  const data = ctx.request.body;

  const trx = await Article.startTransaction();
  let article;

  try {
    article = await Article.query().upsertGraph({
      id: id,
      title: data.title,
      writer: data.writer,
      description: data.description,
      thumbnail: data.thumbnail,
      category: data.category,
      published: data.published,
      created_on: new Date().toISOString(),
      updated_on: new Date().toISOString(),
      blocks: data.blocks
    })

    await trx.commit();
  } catch (err) {
    console.log(err);
    await trx.rollback();
    throw err;
  }

  ctx.body = article;
}

exports.delete = async (ctx) => {
  const {
    id
  } = ctx.params;

  try {
    await Article.query().deleteById(id);
  } catch (e) {
    console.log(e);
    ctx.status = 404;
  }

  ctx.status = 200;
}

exports.upload = async (ctx) => {

  // console.log(`${ctx.request.headers.host}/uploads/${ctx.request.file.originalname}`);
  console.log(ctx.request.file);

  // 성공 시 response format
  ctx.body = {
    'success': 1,
    'file': {
      // url
      'url': `http://${ctx.request.headers.host}/post-rsc-pool/${ctx.request.file.filename}`
    }
  }
}
