const mongoose = require('mongoose');
const Training = require('../models/Training');


/*** SEOSAMH SCRIPT             10.04.2020   ***********/ 
exports.trainingGen = async (req, res) => {res.render('dashboard/training.hbs'); };
exports.getIndividual = async (req, res) => {res.render('dashboard/training/individual.hbs', {cybersecurity:`${req.csrfToken()}`} ); };
exports.getTeam =  async (req, res) => {res.render('dashboard/training/team.hbs',{cybersecurity:`${req.csrfToken()}`} ); };
exports.getWarmup = async  (req, res) => {res.render('dashboard/training/team/warmup.hbs',{cybersecurity:`${req.csrfToken()}`} ); };
exports.getTeamLog = async  (req, res) => {res.render('dashboard/training/team/teamlog.hbs',{cybersecurity:`${req.csrfToken()}`} ); };
exports.getShooting = async  (req, res) => {res.render('dashboard/training/team/shooting.hbs',{cybersecurity:`${req.csrfToken()}`} ); };
exports.getPassing =  async (req, res) => {res.render('dashboard/training/team/passing.hbs',{cybersecurity:`${req.csrfToken()}`} ); };
exports.getKeeping =  async (req, res) => {res.render('dashboard/training/team/keeping.hbs',{cybersecurity:`${req.csrfToken()}`} ); };
exports.getDribbling = async (req, res) => {res.render('dashboard/training/team/dribbling.hbs',{cybersecurity:`${req.csrfToken()}`} ); };
exports.getDefending = async  (req, res) => {res.render('dashboard/training/team/defending.hbs',{cybersecurity:`${req.csrfToken()}`} ); };
exports.getCooldown =  async (req, res) => {res.render('dashboard/training/team/cooldown.hbs',{cybersecurity:`${req.csrfToken()}`} ); };
exports.getTrainingCreator = async (req, res) => {res.render('dashboard/training/trainingCreator.hbs',  {cybersecurity:`${req.csrfToken()}`}); }; 


exports.getTrainings = async (req, res) => 
{

let userID = res.locals.user._id; 
console.log(req.body.decision); 
if(req.body.decision == "1")
{
// personal 
Training.find({user: userID}).exec().then(f => 
{

console.log(f); 

res.render('dashboard/training/team/teamlog.hbs', {msg:"Private Training Sessions", trainings: f});

}); 
}

else if (req.body.decision == "2")
{
let teamID = res.locals.team._id; 
// public 
Training.find({team_id: null, publicInd: true}).exec().then(f => 
{
console.log(f); 

res.render('dashboard/training/team/teamlog.hbs', {msg:"Public Training Sessions", trainings: f});

}); 	
}

else if (req.body.decision == "3")
{
let teamID = res.locals.team._id; 
//Team Only 
Training.find({team_id: teamID, publicInd: false}).exec().then(f => 
{
console.log(f); 
res.render('dashboard/training/team/teamlog.hbs', {msg:"My Team Only Training Sessions", trainings: f});
}); 	
}

else
{
console.log("ERROR!"); 
}
}; 


exports.postTraining = async(req, res) => 
{
let teamID = null; 
if(res.locals.user.userType && req.body.publicInd == false )
{

teamID = res.locals.team._id;
 
}
let userID = res.locals.user._id; 

let training = new Training({ title: 			  req.body.title, 
							  team_id: teamID, 
							  warmup: req.body.warmup,
							  category: req.body.category, 
							  length: req.body.length, 
							  description: req.body.description, 
							  cooldown: req.body.cooldown, 
							  publicInd: req.body.publicInd, 
							  authorName: res.locals.user.name, 
							  user: userID
}).save(); 
res.redirect('/dashboard/training/individual'); 
}






