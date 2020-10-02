const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise;


var date = new Date();

const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');
const teamSchema = new mongoose.Schema({
  teamName:
  {
    type: String,
    trim: true
  },
  addr1: {
    type: String,
    trim: true
  },
  addr2: {
    type: String,
    trim: true
  },
  teamType: {
    type: String
  },
  county: {
    type: String 
}, 
  phNum: {
    type: String 
}, 
  email: {
    type: String 
}, 
  teamType: {
    type: String 
}, 
  coach: {
    type: mongoose.Schema.ObjectId, 
    ref: 'User'
}, 
  teamCode: 
  {
    type:String
}, 
  col1:
  {
  type: String
}, 
  col2: 
  {
  type: String 
}, 
  jerseyType:
  {
  type: String 
   }, 
 created: 
    {
    type: String,
    default: date.toDateString()
   }
});


teamSchema.virtual('videos', {
  ref: 'Video', 
  localField: '_id', 
  foreignField: 'team', 
});

module.exports = mongoose.model('Team', teamSchema);
