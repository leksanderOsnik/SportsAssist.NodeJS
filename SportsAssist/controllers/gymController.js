const mongoose = require('mongoose');
const Gym = require('../models/Gym');




exports.getGymPage = async (req, res) =>
{
	Gym.find({teamID:res.locals.team._id}).exec().then(f => 
	{
	res.render('dashboard/gym.hbs',{cybersecurity: `${req.csrfToken()}`, exerciseArr:f.reverse()});
	}); 
};


exports.addWorkout = (req, res) =>
{
	
	Gym.find({teamId:res.locals.team._id}).exec().then(f => 
	{
	const teamID = res.locals.team._id; 
	let protoArray = JSON.parse(req.body.reqcontent);
	const gym = new Gym({teamID: teamID,
						 exercises: protoArray}).save(); 
	res.redirect("/dashboard/gym"); 
	}); 
}


