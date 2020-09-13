const Tag = require('../../model/tag');
const { transaction } = require('objection');

exports.list = async (ctx) => {
  let page = 0,
    pageSize = 10;

  const {
    domain
  } = ctx.request.query;

  const res = await Tag.query().select('*')
    .where('domain', domain)
    .orderBy('created_on', 'DESC');

  ctx.body = res;
}

exports.write = async (ctx) => {
  const data = ctx.request.body;

  let tag;
  try {

    tag = await transaction(Tag, async (Tag) => {
      return await Tag.query().insert({
        tagname: data.tagname,
        domain: data.domain,
        created_on: new Date().toISOString(),
        updated_on: new Date().toISOString(),
      });
    });

  } catch (error) {
    console.log(error);
    throw error;
  }

  ctx.body = tag;
}

exports.delete = async (ctx) => {
  const {
    id
  } = ctx.params;

  try {
    await Tag.query().deleteById(id);
  } catch (e) {
    console.log(e);
    ctx.status = 404;
  }

  ctx.status = 200;
}
