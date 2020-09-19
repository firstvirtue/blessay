const { Model } = require('objection');

class ArticleTag extends Model {
  static get tableName() {
    return 'article_tag';
  }

  // static get relationMappings() {
  //   // const Tag = require('./tag');
  //   // const Article = require('./article');

  //   return {
  //     // tag: {
  //     //   relation: Model.BelongsToOneRelation,
  //     //   modelClass: Tag,
  //     //   join: {
  //     //     from: 'article_tag.tag_id',
  //     //     to: 'tag.id'
  //     //   }
  //     // },
  //     // article: {
  //     //   relation: Model.BelongsToOneRelation,
  //     //   modelClass: Article,
  //     //   join: {
  //     //     from: 'article_tag.article_id',
  //     //     to: 'article.id'
  //     //   }
  //     // }
  //   }

  // }

}

module.exports = ArticleTag;
