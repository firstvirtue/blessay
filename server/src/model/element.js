var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Element = new Schema({
  articleId: String,
  seq: Number,
  type: String,
  content: String,
  date: Date,
  status: [String]
});

module.exports = mongoose.model('Element', Element);
