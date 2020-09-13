const { Model } = require('objection');

class Tag extends Model {
  static get tableName() {
    return 'tag';
  }
}

module.exports = Tag;
