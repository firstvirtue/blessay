const { Model } = require('objection');

class ArticleTag extends Model {
  static get tableName() {
    return 'article_tag';
  }

  static get relationMappings() {
    const Tag = require('./tag');

    return {
      tag: {
        relation: Model.BelongsToOneRelation,
        modelClass: Tag,
        join: {
          from: 'article_tag.tag_id',
          to: 'tag.id'
        }
      },
    }
  }

  static get modifiers() {
    return {
      withMeta(builder, gender) {
        builder.select('article_tag.id', 'tag_id', 'article_id', 'tagname')
        .joinRelated('tag');
      },
    }
  }

}

module.exports = ArticleTag;
