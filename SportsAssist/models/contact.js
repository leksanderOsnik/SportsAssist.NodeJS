const mongoose = require('mongoose');

var date = new Date();
const contactSchema = new mongoose.Schema({
	fname:{
		type:String,
		required:true,

	},

	lname:{
		type:String,
		required:true,
	},

	email:{
		type:String,
		required:true,
	},
	subject:{
		type:String,
		required:true,
	},
	position:{
		type:String,
	},
	phNum:{
		type:String,
		required:true,
	},
	message:{
		type:String,
		required:true,
	},
	date:{
		type:Date,
		default: date.toDateString(),
	},
});

module.exports = mongoose.model('Contact',contactSchema);