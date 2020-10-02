const mongoose = require('mongoose');
// Use global promise for mongoose
const validator = require('validator');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');


const teamUserRelSchema = new mongoose.Schema({
	player: {
    type: mongoose.Schema.ObjectId, 
    ref: 'User'
	}, 
	team: {
	type: mongoose.Schema.ObjectId, 	
	ref: 'Team'
	}, 
	relationType:{
	type: Boolean
	// true for coach... false for player... not important YET(!?!)
	}, 
  goals:{type:'String'}, 
  assist:{type:'String'},  
  mom: {type:'String'}, 
  clean_sheets: {type:'String'}, 
  cards : {type:'String'}
}); 


module.exports = mongoose.model('TeamUserRel', teamUserRelSchema);
