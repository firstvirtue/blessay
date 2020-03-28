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
      published: data.published,
      created_on: new Date().toISOString(),
      updated_on: new Date().toISOString(),
      blocks: data.blocks
    });

    //article.id

    // article.blocks.forEach(item => {
    //   if(item.type === 'image') {
    //     // await FileManager.translateResource(ctx.request.headers.host, article.id, item.content);


    //     const regex = /uploads/gi;
    //     const newPath = `rsc/${article.id}`;

    //     const filePath = item.content.replace(/http:\/\/192.168.0.14:4000/gi, '');

    //     console.log('=======');
    //     console.log(filePath);
    //     console.log('=======');

    //     // FileManager.moveFile(filePath, `rsc/${article.id}`);

    //     // const b = await Block.query().update({
    //     //   content: newPath
    //     // })
    //     // .where('id', item.id);
    //   }
    //   // console.log(item);
    // });

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
