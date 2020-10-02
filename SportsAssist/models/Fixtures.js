const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const fixturesSchema = new mongoose.Schema ( { 
team : { 
	type: mongoose.Schema.ObjectId,
	ref: 'Team',
	required: true,
	}, 
date : {
	type: String, 
    required: 'Date cannot be Empty!',
    trim: true,
	},
time : {
	type: String, 
    required: 'Time cannot be Empty!',
    trim: true,
	},
venue : {
	type: String, 
    required: 'Venue cannot be Empty!',
    trim: true,
	},
versus : {
	type: String, 
    required: 'Opponent cannot be Empty!',
    trim: true,
	},
ref : {
	type: String, 
    required: 'Referee cannot be Empty!',
    trim: true,
	},
}); 

module.exports = mongoose.model('Fixtures', fixturesSchema); 