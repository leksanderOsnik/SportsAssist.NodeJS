const mongoose = require('mongoose');

const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');
const Feedback = require('../models/feedback');
const Formation =  require('../models/formation');
const Team = require('../models/Team');
const Contact = require('../models/contact');
const TeamUserRel = require('../models/TeamUserRel');
const promisify = require('es6-promisify');

//renders necessary pages
exports.teamListGen = async (req, res) => {
  res.render('teams.hbs', {title:'Welcome to teams Area SportAssist', cybersecurity:`${req.csrfToken()}`}); 
}

exports.getDeletePage = async (req, res) => {
  res.render('account/delete.hbs', {title:'Delete Your account', cybersecurity:`${req.csrfToken()}`}); 
}

exports.getMasterHomePage = async (req, res) => {
  res.render('landing.hbs', {title:'Edit Account',cybersecurity:`${req.csrfToken()}`}); 
}

exports.addContactUs = async(req,res)=>{
  await(new Contact({fname:req.body.firstname , lname:req.body.lastname , email:req.body.email , subject:req.body.subject , position:req.body.position , phNum:req.body.phNum , message:req.body.message })).save();
  res.redirect('/');
}


exports.getRegisterPage = (req, res) => {
  res.render('signup.hbs', { title: 'Create Account',  cybersecurity:`${req.csrfToken()}`});
}

exports.getForgotPage = (req, res) => {
  res.render('forgot.hbs', { title: 'Forgot Password',  cybersecurity:`${req.csrfToken()}`});
}

exports.termsGen = (req, res) =>{
  res.render('terms.hbs',{title:'Terms and Conditions'});
}

//validates that all essential fields are filled when registering
exports.validateRegister = (req, res, next) => {
  req.checkBody('name', 'Name field cannot be empty').notEmpty();
  req.checkBody('email', 'That Email is not valid').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('password', 'Password cannot be Blank!').notEmpty();
  req.checkBody('password-confirm', 'Confirm Password cannot be empty!').notEmpty();
  req.checkBody('phoneNumber', 'Please Supply a Phone Number!').notEmpty(); 
  req.checkBody('dateOfBirth', 'Please Enter Your Date of Birth').notEmpty(); 
  req.checkBody('password-confirm', 'Your Passwords do not match').equals(req.body.password);
  let errors = req.validationErrors();
   //if invalid input(characters) add error to the error array
   if(isNaN(req.body.phoneNumber) )
      {
        if(!errors){
          errors = []; 
        }
    errors.push({msg:"That is not a phone number!"}); 
      }
      //if errors exist re-render the signup page with errors otherwise move onto the next request
  if (errors) {
    console.log(errors); 
    res.render('signup.hbs', { title: 'Register', body: req.body, errs: errors,  cybersecurity:`${req.csrfToken()}`});
    return;
  }
  next();
};

//updates the user information
exports.updateUser = async (req, res) => {
  const user = await User.findOneAndUpdate(
    {
      _id: req.body.id,
    },
    req.body,
    { new: true, runValidatos: true },
  ).exec();

  res.redirect('/teams');
};

//checks if user exists upon registering
exports.checkUserExists = async (req, res, next) => {
  const user = await User.find({ email: req.body.email });
  if (user.length) {
    errors = []; 
    errors.push({msg:"User already found in database!"})
    res.render('signup.hbs', { title: 'Register', body: req.body, errs:errors,  cybersecurity:`${req.csrfToken()}` });
    return;
  }
  next();
};

//removes the user from the database
exports.deleteUser = async (req, res, next) =>
{

    Comment.remove({author: req.body.id}, err => res.end());
    Feedback.remove({author: req.body.id}, err => res.end());
    Formation.remove({author: req.body.id}, err => res.end());
    Post.remove({author: req.body.id}, err => res.end());
    TeamUserRel.remove({player: req.body.id}, err => res.end());
    User.remove({_id: req.body.id}, err => res.end());

    res.redirect('/logout');

next();
}; 

//Registers the user by saving the information in the database
exports.registerUser = async (req, res, next) => {
  const user = new User({ email: req.body.email, 
                          name: req.body.name, 
                          phoneNumber: req.body.phoneNumber,
                          dateOfBirth: req.body.dateOfBirth,
                          proType: req.body.proType,
                          col1: req.body.col1,
                          col2: req.body.col2,
			                    userType: req.body.userType,
                          age: calcAge(req.body.dateOfBirth)
                        });
  const registerWithPromise = promisify(User.register, User);
  await registerWithPromise(user, req.body.password);
  next();
};


//Calculates the user age
function calcAge(dateString) {
  var birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / (31557600000));
}

exports.isManager = (req, res, next) => {
if(req.user.userType == true){

next();

} 
else 
{
res.render("prohibited.hbs", {title: 'Prohibited'}); 
}
}; 
