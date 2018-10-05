var Schema = require('jugglingdb').Schema;
// Pay attention, we are using MongoDB for this example.
var schema = new Schema('mongodb', {url: 'mongodb://127.0.0.1:27017/mvc-app', w:1, j:1});

// Setup Books Schema
var Picture = schema.define('Picture', {
  title : { type: String, length: 255 },
  description: {type: Schema.Text},
  category: {type: String, length: 255 },
  image : { type: JSON}
});

module.exports = schema;
