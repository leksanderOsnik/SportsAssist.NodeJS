const mongoose = require('mongoose');
const validator = require('validator');

var date = new Date();

const nutritionSchema = new mongoose.Schema({
userID:{type: mongoose.Schema.ObjectId},
date : {type: Date, default: date.toDateString()}, 
height : {type: Number}, 
weight: {type: Number}, 
});

module.exports = mongoose.model("nutrition", nutritionSchema); 