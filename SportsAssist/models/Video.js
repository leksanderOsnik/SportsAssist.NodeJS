const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var date = new Date();

const videoSchema = new mongoose.Schema ( { 
team : { 
	type: mongoose.Schema.ObjectId,
	ref: 'Team',
	required: true,
	}, 
code : {
	type: String, 
	trim: true,
    required: 'Code cannot be Empty!',
	},
title : {
	type: String, 
	trim: true,
    required: 'Title Cannot be Empty!',
	}, 
created : {
	type: String, 
	default: date.toDateString(), 
	}, 
}); 

videoSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id', 
  foreignField: 'article', 
});

module.exports = mongoose.model('Video', videoSchema); 