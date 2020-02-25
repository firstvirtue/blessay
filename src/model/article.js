const { Model } = require('objection');

class Article extends Model {
  static get tableName() {
    return 'article';
  }

  static get relationMappings() {
    const Block = require('./block');

    return {
      blocks: {
        relation: Model.HasManyRelation,
        modelClass: Block,
        join: {
          from: 'article.id',
          to: 'article_block.article_id'
        }
      }
    }
  }
}

module.exports = Article;
