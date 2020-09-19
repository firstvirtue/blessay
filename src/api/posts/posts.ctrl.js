const Article = require('../../model/article');
const Block = require('../../model/block');
const FileManager = require('../../lib/fileManager');
const fs = require('fs');
const { transaction } = require('objection');

exports.list = async (ctx) => {
  let page = 0,
    pageSize = 10;

  const {
    index,
    size
  } = ctx.request.query;

  if(index) {
    page = index;
  }

  if(size) {
    pageSize = size;
  }

  const res = await Article.query().select('*')
    .andWhere('published', 1)
    .orderBy('created_on', 'DESC')
    .page(page, pageSize)
    .withGraphFetched('[tags(withMeta)]');;

  // console.log(res);

  ctx.body = res;
}

exports.listByCategory = async (ctx) => {
  const categoryId = ctx.params.categoryId;
  const res = await Article.query().select('*')
    .where('category', categoryId)
    .andWhere('published', 1)
    .orderBy('created_on', 'DESC');
  ctx.body = res;
}

exports.read = async (ctx) => {

  const id = ctx.params.id;

  const res = await Article.query()
    .where('id', id)
    .first()
    .withGraphFetched('[blocks, tags(withMeta)]');

  ctx.body = res;
}

exports.readUserArticles = async (ctx) => {
  const userId = ctx.params.user;

  const res = await Article.query()
    // .eager('blocks')
    .select('*')
    .where('writer', userId)
    .orderBy('created_on', 'DESC');

  ctx.body = res;
}

exports.write = async (ctx) => {
  const { user } = ctx.request;

  const data = ctx.request.body;

  data.writer = user.profile.id;

  let article;

  try {

    article = await transaction(Article, async (Article) => {
      return await Article.query().insertGraph({
        title: data.title,
        writer: data.writer,
        description: data.description,
        thumbnail: data.thumbnail,
        category: data.category,
        published: data.published,
        created_on: new Date().toISOString(),
        updated_on: new Date().toISOString(),
        blocks: data.blocks,
      });
    });

  } catch (err) {
    console.log(`catch: ${err}`);
    throw err;
  }

  ctx.body = article;
}

exports.update = async (ctx) => {
  const {
    id
  } = ctx.params;

  const data = ctx.request.body;
  console.log(data.tags);

  let article;

  try {
    article = await transaction(Article, async (Article) => {
      return await Article.query().upsertGraph({
        id: id,
        title: data.title,
        writer: data.writer,
        description: data.description,
        thumbnail: data.thumbnail,
        category: data.category,
        published: data.published,
        updated_on: new Date().toISOString(),
        blocks: data.blocks,
        tags: data.tags && data.tags.map(tag => {
          delete tag.tagname;
          return tag;
        }),
      });
    });

  } catch (err) {
    console.log(err);
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
