const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const resultsSchema = new mongoose.Schema ( { 
team : { 
	type: mongoose.Schema.ObjectId,
	ref: 'Team',
	required: true,
	}, 
date : {
	type: String, 
	trim: true,
    required: 'Date cannot be Empty!',
	},
time : {
	type: String, 
	trim: true,
    required: 'Time cannot be Empty!',
	},
venue : {
	type: String, 
	trim: true,
	},
versus : {
	type: String, 
	trim: true,
    required: 'Opponent cannot be Empty!',
	},
ref : {
	type: String, 
	trim: true,
    required: 'Referee cannot be Empty!',
	}, 
score : {
	type: String, 
	trim: true,
    required: 'Score cannot be Empty!',
	},
result : {
	type: String, 
	trim: true,
	},
}); 

module.exports = mongoose.model('Results', resultsSchema); 