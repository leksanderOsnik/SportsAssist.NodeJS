const mongoose = require('mongoose');
const md5 = require('md5');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply and email address',
  },
  phoneNumber: {
    type: String, 
    required: 'Please Supply a Phone Number!'
  }, 
  imgURL:{ 
   type: String, 
    }, 
  dateOfBirth: 
  {
    type: String,
    required: 'Please Enter Your Date of Birth'
  }, 
  age:
  {
    type: String
  },
  userType:
  {
    type: Boolean
  },
  name: 
  {
    type: String,
    required: 'Please Supply a name!',
    trim: true,
  },
  salt: 
  {
    type: String,
    required: true,
  },
  col1:
{
type: String
}, 
col2:
{
type: String 
},
proType: {type: String }, 

  hash: 
  {
    type: String,
    required: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.virtual('gravatar').get(function () {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
