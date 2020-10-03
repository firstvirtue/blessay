const { Model } = require('objection');

class Article extends Model {
  static get tableName() {
    return 'article';
  }

  static get relationMappings() {
    const Block = require('./block');
    const ArticleTag = require('./article-tag');

    return {
      blocks: {
        relation: Model.HasManyRelation,
        modelClass: Block,
        join: {
          from: 'article.id',
          to: 'article_block.article_id'
        }
      },
      tags: {
        relation: Model.HasManyRelation,
        modelClass: ArticleTag,
        join: {
          from: 'article.id',
          to: 'article_tag.article_id'
        }
      },
    }
  }

  static async beforeDelete({ asFindQuery, transaction }) {
    const Block = require('./block');
    const ArticleTag = require('./article-tag');

    await Block.query(transaction).delete().whereIn('article_id', asFindQuery().select('id'));
    await ArticleTag.query(transaction).delete().whereIn('article_id', asFindQuery().select('id'));
  }
}

module.exports = Article;
