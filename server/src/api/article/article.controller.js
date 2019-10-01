const Article = require('../../model/article');
const Element = require('../../model/element');

exports.getArticles = async (ctx) => {

  let articles;

  try {
    articles = await Article.find().exec();
  } catch(e) {
    return ctx.throw(500, e);
  }

  ctx.body = articles;
};

exports.getArticle = async (ctx) => {

  const {
    articleId
  } = ctx.params;

  let article;

  console.log(articleId);

  try {
    article = await Article.find({ _id: articleId }).exec();
  } catch(e) {
    return ctx.throw(500, e);
  }

  ctx.body = article;
};

exports.getElement = async (ctx) => {
  console.log(ctx.params);

  let elements;

  try {
    elements = await Element.find().exec();
  } catch(e) {
    return ctx.throw(500, e);
  }

  ctx.body = elements;
};

exports.createArticle = async (ctx) => {
  console.log('-------------------');
  console.log(ctx.request.body);
  console.log('-------------------');

  // request body 에서 값들을 추출합니다
  const {
    category,
    title,
    desc,
    editor,
    updatedDate,
    publishedData,
    status
  } = ctx.request.body;

  const article = new Article({
    category,
    title,
    desc,
    editor,
    updatedDate,
    publishedData,
    status
  });

  try {
    await article.save();
  } catch(e) {
    // HTTP 상태 500 와 Internal Error 라는 메시지를 반환하고,
    // 에러를 기록합니다.
    return ctx.throw(500, e);
  }

  // 저장한 결과를 반환합니다.
  ctx.body = article;
};

// 5d8f44c27d9c390aa8baf275

exports.createElement = async (ctx) => {
  console.log('-------------------');

  // console.log(ctx.params);
  console.log('-------------------');

  // TODO ctx.params.id 체크
  // ctx.throw(500, 'no article');

  // request body 에서 값들을 추출합니다
  const {
    articleId,
    seq,
    type,
    content,
    date,
    status
  } = ctx.request.body;

  const element = new Element({
    articleId,
    seq,
    type,
    content,
    date,
    status
  });

  try {
    await element.save();
  } catch(e) {
    // HTTP 상태 500 와 Internal Error 라는 메시지를 반환하고,
    // 에러를 기록합니다.
    return ctx.throw(500, e);
  }

  // 저장한 결과를 반환합니다.
  ctx.body = element;
};
