const mongodb = require("mongodb");
const mongoose = require("mongoose"); 
const Team = require('../models/Team');
const PrivateMessage = require('../models/PrivateMessage'); 
const User = mongoose.model('User'); 
const TeamUserRel = require('../models/TeamUserRel'); 
var nodemailer = require('nodemailer');


//sends an email to the whole team 
exports.sendTeamEmail = async (req, res) => 
{
    const currTeam = res.locals.team._id;   
    console.log(currTeam);   
    let teamPlayerArr = []; 
    var pipeline = [
        {
            $project: 
            {
                "_id": 0,
                "teamuserrels": "$$ROOT"
            }
        },

        {
            $lookup: 
            {
                localField: "teamuserrels.player",
                from: "users",
                foreignField: "_id",
                as: "users"
            }
        }, 
        {
            $unwind: 
            {
                path: "$users",
                preserveNullAndEmptyArrays: false
            }
        }, 
        { 
            $project : {

                "users._id": "$users._id",
                "users.name": "$users.name",
                "users.email": "$users.email",
                "users.phoneNumber": "$users.phoneNumber",
                "users.dateOfBirth": "$users.dateOfBirth", 
                "teamuserrels.team": "$teamuserrels.team",
                
            }
        }
    ];
    
    TeamUserRel.aggregate(pipeline).exec().then(g => {
     let proto = JSON.parse(JSON.stringify(g)); 
     for(let i = 0; i < proto.length; i++)
     {

        if((proto[i].teamuserrels.team == res.locals.team._id)) 
        {
            teamPlayerArr.push(g[i]); 
        }

    }

    let emailString = ""; 
    for(let k = 0; k < teamPlayerArr.length; k++)
    {
        emailString += teamPlayerArr[k].users.email + ","; 
    }
    console.log(emailString); 


var transporter = nodemailer.createTransport({
  host: "mail.lukegannonkinesiology.com",
  port: 465,
  secure: true,
  auth: {
    user: 'sportassist@lukegannonkinesiology.com',
    pass: 'sportassist1'
  }
});

var mailOptions = {
  from: 'sportassist@lukegannonkinesiology.com',
  to:  emailString,
  subject: req.body.subject,
  text: req.body.emailContent
};

transporter.sendMail(mailOptions, function(error, info){
res.render("dashboard/email.hbs", {msg:"Email sent successfullly!", cybersecurity:`${req.csrfToken()}`} ); 
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }

})

}); 
};
//renders the squad using information from the database
exports.hubGen = async (req, res) => {

	const currTeam = res.locals.team._id;   
	console.log(currTeam);   
	let teamPlayerArr = []; 
    var pipeline = [
        {
            $project: 
            {
                "_id": 0,
                "teamuserrels": "$$ROOT"
            }
        },

        {
            $lookup: 
            {
                localField: "teamuserrels.player",
                from: "users",
                foreignField: "_id",
                as: "users"
            }
        }, 
        {
            $unwind: 
            {
                path: "$users",
                preserveNullAndEmptyArrays: false
            }
        }, 
        { 
            $project : { 
                "users._id": "$users._id",
                "users.name": "$users.name",
                "users.email": "$users.email",
                "users.phoneNumber": "$users.phoneNumber",
                "users.age": "$users.age",
                "users.col1": "$users.col1",
                "users.col2": "$users.col2",
                "users.proType": "$users.proType",
                "users.userType": "$users.userType",
                "teamuserrels.team": "$teamuserrels.team",
                "teamuserrels.goals": "$teamuserrels.goals",
                "teamuserrels.mom": "$teamuserrels.mom",
                "teamuserrels.cards": "$teamuserrels.cards",
                "teamuserrels.clean_sheets": "$teamuserrels.clean_sheets",
                "teamuserrels.assist": "$teamuserrels.assist",
                "_id": 0
            }
        }
    ];
    
    TeamUserRel.aggregate(pipeline).exec().then(g => {
     let proto = JSON.parse(JSON.stringify(g)); 
     for(let i = 0; i < proto.length; i++)
     {

   		if((proto[i].teamuserrels.team == res.locals.team._id)) 
        {
   			teamPlayerArr.push(g[i]); 
   		}
     }
    console.log(teamPlayerArr); 
    res.render('dashboard/squad.hbs', {title:'Welcome to team hub', teamMembers:teamPlayerArr, cybersecurity:`${req.csrfToken()}` }); 
 }); 
}; 
//update procedure, updates the player statistics
exports.updateProc = async (req, res, next) => 
{
const protoTeam = res.locals.team._id; 
const protoPlayer = req.body.player; 
try 
{   
    TeamUserRel.findOneAndUpdate({team:mongoose.Types.ObjectId(protoTeam), player: mongoose.Types.ObjectId(protoPlayer)}, 
    {$set: {goals: req.body.goals, mom: req.body.mom, cards : req.body.cards, clean_sheets: req.body.cleanSheet, assist: req.body.assist}}, 
    {upsert: true}).exec().then(f => {next(); });

    res.redirect('/dashboard/squad');
} 
catch(e)
{ 
console.log(e); 
}
}


exports.getEmailArea = async (req, res) => 
{
    res.render("dashboard/email.hbs", {cybersecurity:`${req.csrfToken()}`}); 
}

