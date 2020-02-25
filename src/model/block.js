const { Model } = require('objection');

class Block extends Model {
  static get tableName() {
    return 'article_block';
  }
}

module.exports = Block;
