var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Article = new Schema({
  category: String,
  title: String,
  desc: String,
  editor: String,
  updatedDate: Date,
  publishedData: Date,
  status: [String]
});

module.exports = mongoose.model('Article', Article);
