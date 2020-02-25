const Article = require('../../model/article');

exports.list = async (ctx) => {

  const res = await Article.query().select('*');

  console.log(res);

  ctx.body = res;
}

exports.write = async (ctx) => {
  // const data = ctx.request.body;

  const data = {
    title: 'data.title',
    writer: 'data.writer',
    description: 'data.description',
    blocks: [
      { content: '1', created_on: new Date().toISOString(), updated_on: new Date().toISOString() },
      { content: '2', created_on: new Date().toISOString(), updated_on: new Date().toISOString() },
      { content: '3', created_on: new Date().toISOString(), updated_on: new Date().toISOString() },
    ]
  }

  // console.log(data);

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
    .where('id', id);

  ctx.body = res;
}

// exports.update = async (ctx) => {
//   const {
//     id
//   } = ctx.params;

//   const data = ctx.request.body;

//   console.log(data.content);

//   const res = await ctx.app.pool
//     .connect()
//     .then(client => {
//       client.release();
//       return client
//         .query('UPDATE article SET content = $2 WHERE ID = $1', [id, data.content]);
//     });

//   ctx.body = res.rows[0];
// }

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
