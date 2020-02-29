const { Model } = require('objection');
const Block = require('./block');

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

  static async beforeDelete({ asFindQuery, transaction }) {
    await Block.query(transaction).delete().whereIn('article_id', asFindQuery().select('id'));
  }
}

module.exports = Article;
