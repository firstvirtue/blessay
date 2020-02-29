const Article = require('../../model/article');

exports.list = async (ctx) => {

  const res = await Article.query().select('*');

  console.log(res);

  ctx.body = res;
}

exports.write = async (ctx) => {
  const data = ctx.request.body;

  data.writer = 'data.writer';

  const res = await Article.query().insertGraph({
    title: data.title,
    writer: data.writer,
    description: data.description,
    created_on: new Date().toISOString(),
    updated_on: new Date().toISOString(),
    blocks: data.blocks
  })

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

exports.update = async (ctx) => {
  const {
    id
  } = ctx.params;

  const data = ctx.request.body;

  const res = await Article.query().upsertGraph({
    id: id,
    title: data.title,
    writer: data.writer,
    description: data.description,
    created_on: new Date().toISOString(),
    updated_on: new Date().toISOString(),
    blocks: data.blocks
  })

  ctx.body = res;
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

  console.log(ctx.request);

  // 성공 시 response format
  ctx.body = {
    'success': 1,
    'file': {
      // url
      'url': `http://localhost:4000/uploads/${ctx.request.file.originalname}`
    }
  }
}
