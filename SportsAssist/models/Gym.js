const mongoose = require('mongoose');
const validator = require('validator');



const gym = new mongoose.Schema({
	teamID : {
		type: mongoose.Schema.ObjectId
	},

exercises:[{
	name :{	type:String},
	sets : {type:String},
	reps : { type: String},
	weight : { type: String}
}]
});

module.exports = mongoose.model('Gym', gym);