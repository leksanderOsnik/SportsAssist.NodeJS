const express = require('express');
const Formation = require('../models/formation');
const Feedback = require('../models/feedback');
const fetch = require('node-fetch');
const mongoose = require('mongoose'); 
const router = express.Router();

var date = new Date();


//adds formation to the database
exports.addFormation =  (req, res) => 
{
    let formation = new Formation(req.body);
    formation['date'] = date.toDateString();
    formation['author'] = req.user._id;
    formation['authorName'] = req.user.name;
    formation.save((err, f) => {
        if (err) 
        {
            console.log(err);
            return next(err);
        }
        //redirects to the new formation
        res.redirect(`/dashboard/formations/${f._id}`);
  });
}; 

//adds comment to the formation
exports.addCommentFormation =  (req, res) => 
{

    let comment = new Feedback();
    comment['feedback'] = req.body.userFeedback;
    comment['formationID'] = req.params.id;
    comment['author'] = req.user._id;
    comment['authorName'] = req.user.name;
    comment['date'] = date.toDateString();
    comment.save(   (err, f) => {
        if (err) 
        {

            return next(err);

        }
        //redirect to previous page if successful
        res.redirect(`back`);
    });
};

//remmoves formation from the database
exports.deleteFormation = (req, res) => {
    let obj = {_id: req.params._id};
    Formation.remove(obj, err => res.end());
};



//updates the formation and adds it to the database
exports.saveFormation = (req, res) => {
    let generic;
    Formation.findOne(req.params).exec().then( minorGeneric => {

    if(!req.body.team_id){
       generic = {dots: JSON.parse(req.body.dots)};
    }
    else
    {
        console.log("Printing out the team's id2" + req.body.team_id); 
       generic = {dots: JSON.parse(req.body.dots), team_id:req.body.team_id};
    }
    
     let currUser = req.user._id;
     let author =  minorGeneric.author; 

    if(currUser == author)
    {

    Formation.findOneAndUpdate(req.params, {$set: generic}, {new: true}, (err, doc) =>
    {
        console.log("Successful Update Took place"); 
        if(err)
        {
             console.log("Something wrong when updating data!");
        }
    });

    }
    else 
    {
             console.log("You don't have permission to update this!"); 
    }   
    }).catch(err => {throw err})
}

//produces a copy of the formation
exports.copyFormation = (req, res) => {
    let formation = new Formation(req.body);
    formation['date'] = new Date();
    formation['author'] = req.user._id;
    formation['authorName'] = req.user.name;
    formation['name'] = req.body.name;
    formation['dots'] = JSON.parse(req.body.dots);
    formation.save((err, f) => {
        if (err) {
            return next(err);
        }
    });
    res.render('/dashboard/formations.hbs',{cybersecurity: `${req.csrfToken()}`}); 
 };


//alllows the user to access the formation with formation id
exports.getFormationWithId =  (req, res) => {


    Formation.findOne({ _id: req.params.id}).exec().then( generic => {
        Feedback.find({formationID:req.params.id}).exec().then(commentsModel => {
            let readwrite; 
            let coachPermissions = false; 
            let private_ind = false; 
            let author = generic.author; 
            let currUser = req.user._id; 
            let originalAuthorInd = false; 
            if(author == currUser){
                console.log("AUTHOR INFORMATION" + author); 
                originalAuthorInd = true; 
            }
            if(req.user.userType)
                {
                    console.log("This formation has team id, user accessing it is a coach and has team id matching the formation ")
                    coachPermissions = true; 
                }
            if(generic.team_id)
            {
                private_ind = true; 
             if(generic.team_id != res.locals.team._id)
             {
                console.log("This formation has a team id... user trying to access it has different team to the formation's team id");
                res.redirect("/error"); 

             }
            }

            if(!private_ind)
            {
                console.log("This formation does not have a team id, therefore it is public "); 
                readwrite = true; 
            }
            else if(private_ind && !coachPermissions)
            {
                console.log("This formation does have a team id matching the one the user has... allow read only access"); 
                readwrite = false; 
            }
            else if (private_ind && coachPermissions)
            {
                readwrite = true; 
            }
        
            req.app.locals.dots = JSON.stringify(generic.dots);
                console.log(req.app.locals.dots); 
                let team1 = [];
                let team2 = [];
                let team1Name = generic.dots[0].team
                generic.dots.forEach((dot, i) => {
                    return  (team1Name == dot.team) ? team1.push(dot)
                        : (dot.id == '999') ? console.log('ball', dot)
                        : team2.push(dot);
            });
            res.render('dashboard/formations/new.hbs', {formation:generic, user:req.user, teamRestrict:readwrite, coachInd:coachPermissions, originalAuthor:originalAuthorInd,   team1: team1, team2: team2, comments: commentsModel, cybersecurity:`${req.csrfToken()}`})
        }).catch(err => {throw err})
    }).catch(err => {throw err})
};


//retrieves all the formations created by the user
exports.getUsersFormations = (req, res) => {
    Formation.find({ author: req.user._id}).exec().then(f => {
    Formation.find({team_id: res.locals.team._id}).exec().then(x =>{
    Formation.find({team_id: null}).exec().then(y => {
res.render('dashboard/formations.hbs', {user: req.user, formations: f, teamArrRes: x, publicFormations: y, cybersecurity:`${req.csrfToken()}`});
    
    })    
    })
    }).catch(err => { throw err})
};
//deletes the formation from the database
exports.deleteFormation = (req, res) => {
    let obj = {_id: req.params._id};
    Formation.remove(obj, err => res.end());
};


