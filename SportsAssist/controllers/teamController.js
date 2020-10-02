const mongoose = require('mongoose');
const Team = require('../models/Team'); 
const User = mongoose.model('User'); 
const promisify = require('es6-promisify');
const session = require('express-session');
const TeamUserRel = require('../models/TeamUserRel'); 


exports.team404 = async (req, res) => {
  res.render('teams/team404.hbs'); 
};



/*********** Check Team Exists ************/ 
exports.checkForTeam = async (req, res, next) =>
{
try { 
console.log("HITTING TEAM EXISTENCE CHECKER  "); 
let existsIndicator = await Team.find({teamCode:req.body.potentialTeamID}, {limit:1});
if(existsIndicator.length) 
{
console.log("Getting to team Join"); 
next(); 
}
else 
{res.render('teams/teamNotFound.hbs');
next(); 
} 
}
catch(err){console.log("ERROR");}
}


/************ Join team **********************/ 
exports.userNewTeam = async (req, res) =>
{
try
{ 
console.log("HITTING USER TEAM JOIN REL PROCEDURE "); 
let genericTeam = await Team.find({teamCode:req.body.potentialTeamID}); 
if(genericTeam[0]){
let teamRes = await JSON.parse(JSON.stringify(genericTeam[0]));
const teamResId = await teamRes._id; 
const playerId = await res.locals.user.id
let findIfJoinedAlready = await TeamUserRel.find({player:req.user.id, team:teamResId}); 
console.log("FOUND:" + findIfJoinedAlready[0]); 
if(findIfJoinedAlready[0])
{
  res.render('teams/teamAlreadyJoined.hbs', {teamxName:teamRes.teamName}); 
}
else 
{
const genericTeamUserRel = await new TeamUserRel({
  player: playerId, 
  team: teamResId, 
  relationType:false, 
  goals:0, 
  assist:0,  
  mom: 0, 
  clean_sheets:0, 
  cards :0
}).save(); 
res.redirect('/teams');
console.log("Team Successfully Joined"); 
}
} 
else
{
res.render('teams/team404.hbs');
}
}
catch(err){console.log("ERROR!");}
};


exports.destroyTeamCookie = async (req, res, next) =>
{
console.log("BEGINNING COOKIE DESTRUCTION PROC "); 
if(res.cookie.team || res.locals.team){
res.clearCookie('team'); 
res.locals.team = null; 
console.log("TEAM COOKIE SUCCESSFULLY DESTROYED "); 
}
else {
console.log("No team cookie to destroy"); 
}
next(); 
};

exports.updateTeam = async (req, res) => {
  const team = await Team.findOneAndUpdate(
    {
      _id: req.body.id,
    },
    req.body,
    { new: true, runValidatos: true },
  ).exec();

  await res.cookie("team", team);
  res.locals.team = team; 

  res.redirect('/dashboard');
};


exports.deleteTeam = async (req, res, next) =>
{
console.log("BEGINNING TEAM DELETION "); 

    Team.remove({_id: req.body.id}, err => res.end());
    TeamUserRel.remove({team: req.body.id}, err => res.end())

next();
}; 

exports.leaveTeam = async (req, res, next) =>
{
console.log("BEGINNING TEAM LEAVE PROCEDURE"); 

     TeamUserRel.remove({team: req.body.teamId, player: req.body.userId}, err => res.end());

next();
}; 

//has a team available
exports.hasTeam = async (req, res, next) => {
  
  const rel = await TeamUserRel.find({ player: req.user });

  if (rel.length) {
    
     next();
  }
  else{

    res.redirect('/teams/new');

  }

};

//has a team currently
exports.hasTeamCurrently = async (req, res, next) => {
  

  if (!res.locals.team && !res.cookie.team) {
    
     res.redirect('/teams');
  }
  else{

    next();

  }

};


exports.destroyTeamArrayCookie  = async(req, res, next) => {
console.log("Beginning cookie destruction procedure for team array cookie"); 
if(res.cookie.teamArr || res.locals.teamArr){
  res.clearCookie("teamArr"); 
  res.locals.teamArr = null; 
  console.log("Team Array Cookie successfully destroyed"); 
}
else {console.log("No team cookie found to destroy"); 
}
next(); 
}

/********** JOE CHANGES 20.03.2020 ***************************/ 

exports.setTeamArrayCookieDriver = async(req, res, next) => {
try 
{
  const protoUser = req.user.id; 
  // pulling back all the relations between user and teams 
  let relationProtoType = await TeamUserRel.find({player: protoUser}); 
  let continueInd = true; 
  // making sure at least one exists, if one doesn't exist, say next; 
  if(relationProtoType[0])
  {  
  console.log("Relation exists, has hit inside loop")
  //parsing json, now should have an array of team relation objects; 
  const teamProtoArray = await JSON.parse(JSON.stringify(relationProtoType)); 
  var teamsArr = new Array(); 
  for(let i = 0; i < teamProtoArray.length; i++)
  {
    console.log("ARRAY LENGTH" + teamProtoArray.length); 
    let genericTeam = await Team.find({_id:teamProtoArray[i].team}); 
    let normalisedTeamObject = await JSON.parse(JSON.stringify(genericTeam[0]));
    teamsArr.push(normalisedTeamObject); 
    console.log("Pushing object into cookie" + normalisedTeamObject); 
  }
  console.log("SETTING COOKIE SUCCESSFULLY "); 
  res.cookie("teamArr", teamsArr); 
  }
    next(); 
}
catch(err){console.error(err);}
}; 

/************* Cookie creator for log in ***************/ 
exports.teamCookieDriver = async(req, res, next) => {
try 
{
  const protoUser = req.user.id; 
  let relationProtoType = await TeamUserRel.find({player: protoUser}); 
  if(relationProtoType[0])
  { 
  console.log("HITTING INNER LOOP"); 
  // taking id from the function
  let genericTeam = await Team.find({_id:req.body.teamId})
  //let genericTeam = await Team.find({_id:req.body.teamId}); 
  const teamNormalised =  await JSON.parse(JSON.stringify(genericTeam[0])); 
  await res.cookie("team", teamNormalised);
  res.locals.team = teamNormalised; 
  console.log("SELECTED TEAM IS" + teamNormalised); 
  }
  next(); 
}
catch(err){console.error(err);}
}; 

/************ post team to database *****************/ 
exports.addTeam = async (req, res) =>
{
try 
{
const protoJoinCode = getJoinCode();
	if(req.body.teamName.length > 20)
		{
		 let teamLength = req.body.teamName.length; 
		 res.redirect('teams/new', {msg:"Your team name is too long. Please try again with a name less than 20 characters "}); 
		} 

req.body.teamCode = protoJoinCode; 
const team = await new Team({
        teamName: req.body.teamName, 
        addr1: req.body.addr1, 
        addr2: req.body.addr2,
 	      county: req.body.county, 
  	    phNum: req.body.phNum, 
  	    email: req.body.email, 
        teamType: req.body.teamType,
	      jerseyType: req.body.jerseyType,
        col1: req.body.col1,
        col2: req.body.col2,
        coach: req.user,
        teamCode: req.body.teamCode
   }).save(); 
const genericTeamUserRel = new TeamUserRel({
        player: res.locals.user._id,
        team: team._id,
        relationType:true, 
        goals:"0", 
        assist:"0",  
        mom:"0", 
        clean_sheets: "0", 
        cards :"0" 
}).save(); 

res.redirect('/teams'); 
}
catch(err){console.error(err);}
};





/*************** Generates relation for team <-> coach *************/ 
// old version

exports.generateNewRelationForCoach = async (req, res) => {
let genericTeam = await Team.find({coach: req.user}).sort({created: -1}); 
if(TeamUserRel.find({player: req.user.id, team:genericTeam[0].id})){
  res.redirect("/teams"); 
}
const playerId = await res.locals.user.id
const genericTeamUserRel = new TeamUserRel({
        player: req.user.id, 
        team: genericTeam[0].id, 
        relationType:true, 
        goals:"0", 
        assist:"0",  
        mom:"0", 
        clean_sheets: "0", 
        cards :"0" 
}).save(); 
console.log("TEAM SUCCESSFULLY RELATED TO PLAYER!"); 
console.log("GENERIC TEAM USER REL " + genericTeamUserRel); 
let teamRes = await JSON.parse(JSON.stringify(genericTeam[0])); 
console.log("TEAM RESULT" + teamRes); 
res.redirect("/teams"); 
//res.cookie("team", teamRes); 
//res.render('dashboard.hbs') ; 
}

/******* generates join code for each team ************/ 
function getJoinCode()
{
return Math.random().toString(36).slice(-5);
}


/***** Front End for Team Creation Wizard *************/ 
exports.showTeamCreationWizard = (req, res) => {
if(req.user.userType == true){
res.render("teams/newManager.hbs", {title: 'teamCreationWizard', cybersecurity:`${req.csrfToken()}`}); 
} 
else 
{
res.render("teams/newPlayer.hbs", {title: 'joinTeam', cybersecurity:`${req.csrfToken()}`}); 
}
}; 