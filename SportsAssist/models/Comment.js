const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var date = new Date();

const commentSchema = new mongoose.Schema({
  article: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: 'Comment should have a valid Article',
  },
  comment: {
    type: String,
    trim: true,
    required: 'Comment cannot be Empty!',
  },
  name: {
    type: String,
    trim: true,
    required: 'Name Cannot be Empty!',
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'A user is required!',
  },
  created: {
    type: Date,
    default: date.toDateString(),
  },
});

module.exports = mongoose.model('Comment', commentSchema);
