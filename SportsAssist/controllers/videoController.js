const mongoose = require('mongoose'); 

const Video = require('../models/Video');
//adds video onto the database
exports.addVideo = async (req, res) => {
  
  await (new Video(req.body)).save();

  res.redirect('/dashboard/video/');
};
//Renders the video analysis page
exports.getVideoAnalysisPage = async (req, res) => 
{

	  const teamID = res.locals.team._id;

	Video.find({team: mongoose.Types.ObjectId(teamID)}).exec().then(g => {

	if (g[0] != undefined){

    let y = g.length;

		res.redirect('/dashboard/video/'+g[y-1].code);

	}
	else{

		res.render('dashboard/video.hbs',{cybersecurity: `${req.csrfToken()}`}); 

	}

});

}; 

//removes video from the database
exports.deleteVideo = async (req, res, next) =>
{
     Video.remove({_id: req.body.vidID}, err => res.end());

     res.redirect('/dashboard/video')

next();
}; 
//retrieves the video by it's id
exports.getVideoByCode = async (req, res) => {

  const video = await Video.findOne({ code: req.params.code }).populate('author comments');
  const teamID = res.locals.team._id;
  //if a video does not exist redirect to error page
  if (!video) {
    res.redirect('/error'); 
    return;
  }
  //if a video does not belong the the team redirect to prohibited page
  if(teamID != video.team)
    { 
    res.render('prohibited.hbs'); 
    return;
    }

Video.find({team: mongoose.Types.ObjectId(teamID)}).exec().then(g => {

  res.render('dashboard/video/new.hbs', { title: 'Video', videos: g.reverse(), video, cybersecurity:`${req.csrfToken()}`}); });

};

