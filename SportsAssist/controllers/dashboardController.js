const mongoose = require('mongoose'); 
require('../models/TeamUserRel'); 
const Fixture = require('../models/Fixtures');
const Result = require('../models/Results');

// Generate Pages

exports.dashboardGen =  (req, res) => {res.render('dashboard.hbs', {title:'Welcome to User Area SportAssist', team: res.locals.team, cybersecurity:`${req.csrfToken()}`}); }

exports.fixturesGen = async (req, res) => 
{
	const teamID = res.locals.team._id;

Fixture.find({team: mongoose.Types.ObjectId(teamID)}).exec().then(g => {

{res.render('dashboard/fixtures.hbs', {title:'Welcome to team fixtures', fixtures:g, cybersecurity:`${req.csrfToken()}`})}; 

})
};

exports.resultsGen = async (req, res) => 
{
	const teamID = res.locals.team._id;

Result.find({team: mongoose.Types.ObjectId(teamID)}).exec().then(r => {

	{res.render('dashboard/results.hbs', {title:'Welcome to team results', result: r, cybersecurity:`${req.csrfToken()}`})};

})
};


exports.gymGen = async (req, res) => {res.render('dashboard/gym.hbs', {title:'Welcome to team gym',cybersecurity: `${req.csrfToken()}`}); }
exports.nutritionGen = async (req, res) => {res.render('dashboard/nutrition.hbs', {title:'Welcome to team nutrition',cybersecurity: `${req.csrfToken()}`}); }
exports.tacticsGen = async (req, res) => {res.render('dashboard/tactics.hbs', {title:'Welcome to team tactics',cybersecurity: `${req.csrfToken()}`}); }
exports.trainingGen = async (req, res) => {res.render('dashboard/training.hbs', {title:'Welcome to team training',cybersecurity: `${req.csrfToken()}`}); }
exports.teamTrainingGen = async (req, res) => {res.render('dashboard/training/team.hbs', {title:'Welcome to team training',cybersecurity: `${req.csrfToken()}`}); }
exports.individualTrainingGen = async (req, res) => {res.render('dashboard/training/individual.hbs', {title:'Welcome to training',cybersecurity: `${req.csrfToken()}`}); }
exports.settingsGen = async (req, res) => {res.render('dashboard/settings.hbs', {title:'Settings', cybersecurity:`${req.csrfToken()}`}); }
exports.deleteGen = async (req, res) => {res.render('dashboard/settings/delete.hbs', {title:'Delete Team', cybersecurity:`${req.csrfToken()}`}); }
exports.detailsGen = async (req, res) => {res.render('dashboard/details.hbs', {title:'Team Information',cybersecurity: `${req.csrfToken()}`}); }

exports.leaveGen = async (req, res) => {
	//if manager redirect to delete team page
	if(req.user.userType == true){
	res.redirect('/dashboard/settings/delete');
	} 
	//if player render leave team page
	else 
	{
	res.render('dashboard/leave.hbs', {title:'Leave Team', cybersecurity:`${req.csrfToken()}`}); 
	}

}


exports.addFixture = async (req, res) => {
  
  await (new Fixture(req.body)).save();

  res.redirect('/dashboard/fixtures');
};

exports.deleteFixture = async (req, res, next) =>
{
     Fixture.remove({_id: req.body.fixID}, err => res.end());

     res.redirect('/dashboard/fixtures')

}; 

exports.addResult = async (req, res) => {
  
  await (new Result(req.body)).save();

  res.redirect('/dashboard/results');
};

exports.deleteResult = async (req, res, next) =>
{
    Result.remove({_id: req.body.resID}, err => res.end());

     res.redirect('/dashboard/results')

}; 

