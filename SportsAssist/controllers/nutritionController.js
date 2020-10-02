const mongoose = require('mongoose');
const Nutrition = require('../models/nutrition');

//adds nutrition information to the database
exports.addNutrition = async(req, res) =>{
	
	await (new Nutrition({userID:res.locals.user._id,height:req.body.height,weight:req.body.weight})).save();
	res.redirect('/dashboard/nutrition');
}	
//retrieves the nutrition page
exports.getNutritionPage = async (req,res) =>
{
	

	Nutrition.find({userID: mongoose.Types.ObjectId(res.locals.user._id)}).sort({_id:-1}).exec().then(f => {
		res.render('dashboard/nutrition.hbs',{title:"Nutrition",nutrition:f,
			cybersecurity: `${req.csrfToken()}`});
		});	
};