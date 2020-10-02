const mongoose = require('mongoose');
// Use global promise for mongoose
const validator = require('validator');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

var date = new Date();


const PrivateMessageSchema = new mongoose.Schema({
	player: {
    type: mongoose.Schema.ObjectId, 
    ref: 'User'
	}, 
	team: {
	type: mongoose.Schema.ObjectId, 	
	ref: 'Team'
	}, 
	subject: {
	type:"String"	
	}, 
	content: {
	type: "String"
	}, 
	created: {
	type: String, 
	default: date.toDateString(),  	
	}

}); 


module.exports = mongoose.model('PrivateMessage', PrivateMessageSchema);
