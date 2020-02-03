exports.list = async (ctx) => {

  const res = await ctx.app.pool
    .connect()
    .then(client => {
      client.release();
      return client
        .query('SELECT * FROM article');
    });

  console.log(res);

  ctx.body = res.rows;
}

exports.write = async (ctx) => {
  const data = ctx.request.body;

  const res = await ctx.app.pool
    .connect()
    .then(client => {
      client.release();
      return client
        .query('INSERT INTO article(content, version, updateddate, publisheddate) VALUES($1, $2, now(), now()) RETURNING id', [data.content, data.version]);
    });

  ctx.body = res.rows[0];
}

exports.read = async (ctx) => {

  const id = ctx.params.id;

  const res = await ctx.app.pool
    .connect()
    .then(client => {
      client.release();
      return client
        .query('SELECT * FROM article WHERE ID = $1', [id]);
    });

  ctx.body = res.rows[0];
}

exports.update = async (ctx) => {
  const {
    id
  } = ctx.params;

  const data = ctx.request.body;

  console.log(data.content);

  const res = await ctx.app.pool
    .connect()
    .then(client => {
      client.release();
      return client
        .query('UPDATE article SET content = $2 WHERE ID = $1', [id, data.content]);
    });
  
  ctx.body = res.rows[0];
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