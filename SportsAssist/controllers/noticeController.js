const mongodb = require("mongodb");
const mongoose = require("mongoose"); 
const Team = require('../models/Team');
const PrivateMessage = require('../models/PrivateMessage'); 
const User = mongoose.model('User'); 
const TeamUserRel = require('../models/TeamUserRel'); 


exports.createNoteGen = async (req, res) => {

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
                "users.userType": "$users.userType",  
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
     if(req.resultMsg){
    res.render("dashboard/noticeboard/create.hbs", {teamMembersArr: teamPlayerArr, msg:req.resultMsg, cybersecurity:`${req.csrfToken()}`});
    }
    res.render("dashboard/noticeboard/create.hbs", {teamMembersArr: teamPlayerArr, cybersecurity:`${req.csrfToken()}`}); 
}); 

}


exports.addNewNote = async (req, res, next) => 
{
const msg = await new PrivateMessage({
        player: req.body.player, 
        team: req.body.team, 
        subject: req.body.subject,
        content: req.body.content, 
}).save(); 

res.redirect("/dashboard/noticeboard/create"); 
};


exports.noticeboardGen = async (req, res) =>
{
PrivateMessage.find({team: res.locals.team._id, player: mongoose.Types.ObjectId(req.body.player)}).exec().then(f => {
User.findOne({_id: mongoose.Types.ObjectId(req.body.player)}).exec().then(g => {
res.render("dashboard/noticeboard.hbs",{messages:f.reverse(), name:g.name, cybersecurity: `${req.csrfToken()}`}); 
});}); 
}; 