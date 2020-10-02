const mongoose = require('mongoose');

const Comment = mongoose.model('Comment');

//adds comment to the database 
exports.newComment = async (req, res) => 
{
  req.body.author = req.user._id;
  req.body.name = req.user.name;
  await (new Comment(req.body)).save();
  console.log("SUCCESS POST"); 
  res.redirect('back');
};
