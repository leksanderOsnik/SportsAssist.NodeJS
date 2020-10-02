const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const Team = require('../models/Team'); 
const Formation = require('../models/formation');

var date = new Date();

//retrieves the main discussion forum
exports.getIndexPage = async (req, res) => 
{

  const page = req.params.page || 1;
  const limit = 5;
  const skip = (page * limit) - limit;
  let query =  {team_id: null}; 
  let header = "Welcome to the SportAssist Public Discussion Forum"; 
  const postsPromise = await Post.find(query).sort({ created: -1 }).populate('author').skip(skip)
    .limit(limit); 
  const countPromise = await Post.count(query);
  console.log(countPromise); 
  const [posts, count] = await Promise.all([postsPromise, countPromise]);
  const pages = Math.ceil(count / limit);
  res.render('forum.hbs', {title: 'Home Page', posts,page, pages, pageHeader:header, count, pageTitle: 'Lastest Posts', cybersecurity:`${req.csrfToken()}`});
};

//retrieves the team discussion forum
exports.getTeamIndexPage = async (req, res) => 
{
  const page = req.params.page || 1;
  const limit = 5;
  const skip = (page * limit) - limit;
  if(res.locals.team != null)
  {
  let GenericTeamName = res.locals.team.teamName; 
  query = {team_id: res.locals.team._id}; 
  }
  const postsPromise = await Post.find(query).sort({ created: -1 }).populate('author').skip(skip)
    .limit(limit); 
  const countPromise = await Post.count(query);
  console.log(countPromise); 
  const [posts, count] = await Promise.all([postsPromise, countPromise]);
  const pages = Math.ceil(count / limit);
  res.render('dashboard/forum.hbs', {title:'Welcome to the forum', posts,page, pages, pageHeader:"Welcome to the  Team Discussion Forum", count, teamName: res.locals.team.teamName, cybersecurity:`${req.csrfToken()}`}); 
};


//retrieves the posts posted by the user
exports.getUserPosts = async (req, res) => {
  const posts = await Post.find({ author: req.user._id });
  for(let i = 0; i < posts.length; i++){
    if(posts[i].team_id){
     let teamName = JSON.stringify(( await  Team.find({_id:posts[i].team_id}, 'teamName'))); 
     teamName = JSON.parse(teamName.slice(1, teamName.length -1 )); 
     teamName = JSON.stringify(teamName["teamName"]); 
      posts[i]["postType"] = teamName.slice(1, teamName.length- 1) ; 
    }
    else {
      posts[i]["postType"] = "Public"; 
    }
  }
    
    Formation.find({ author: req.user._id}).exec().then(f => {
    res.render('account.hbs', {user: req.user, posts, formations: f, cybersecurity:`${req.csrfToken()}`});
    }).catch(err => { throw err})
};



//adds a new post to the main forum
exports.newPost = async (req, res) => {
  req.body.author = req.user._id;
  const post = await (new Post(req.body)).save();
  req.flash('success', `Successfully Created ${post.title}.`);
res.redirect('/forum');}; 

 //adds a new post to the team forum
exports.TeamNewPost = async (req, res) => {
  req.body.author = req.user._id;
  if(res.locals.team)
  {
    req.body.team_id = res.locals.team._id;  
  }
  else {
    req.body.team_id = null; 
  }
  const post = await (new Post(req.body)).save();
  req.flash('success', `Successfully Created ${post.title}.`);
  res.redirect('/dashboard/forum');
  if (err) { console.log(err);}
}; 

//removes the post from the main forum and database
exports.deletePost = async (req, res, next) =>
{
    let dash = false
    let post =  {id: req.body.id};

    if(post.team_id){

      dash = true;
    }

    Post.remove({_id: req.body.id}, err => res.end());

        res.redirect('/forum');
  
}; 
//removes the post from the team forum and database
exports.deleteTeamPost = async (req, res, next) =>
{
    let dash = false
    let post =  {id: req.body.id};

    if(post.team_id){

      dash = true;
    }

    Post.remove({_id: req.body.id}, err => res.end());


    res.redirect('/dashboard/forum');
  
}; 



//retrieves the post using the slug
exports.getPostBySlug = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate('author comments');
    let author = JSON.stringify(post.author._id);
    let currUser = JSON.stringify(req.user._id);
    let originalAuthorInd = false; 

   if(author == currUser){

      originalAuthorInd = true; 
      console.log("Current User is Author");

      } 

  if (!post) {
    res.redirect('/error'); 
    return;
  }
  if(post.team_id)
  {

    if(res.locals.team._id != post.team_id)
    { 
    res.render('prohibited.hbs'); 
    }
  else 
  {
  res.render('dashboard/forum/post.hbs', { title: post.title, originalAuthor:originalAuthorInd, post, cybersecurity:`${req.csrfToken()}`}); 
  }


  }
  else if(!res.locals.team && post.team_id)
  {
    res.render('prohibited.hbs');
  }
  else 
  {
  res.render('forum/post.hbs', { title: post.title, originalAuthor:originalAuthorInd, post, cybersecurity:`${req.csrfToken()}`}); 
}

};




//retrieves the post from the main forum to be edited and updated
exports.getPostToUpdate = async (req, res) => {

  let query =  {slug: req.params.slug, author: req.user._id }; 
  const post = await Post.findOne(query).populate('author');
  if (!post) 
  {
    res.redirect('/error'); 
    return;
  }
  res.render('forum/edit.hbs', { title: `Edit ${post.title}`, post,  cybersecurity:`${req.csrfToken()}`});
};




//retrieves the post from the team forum to be edited and updated
exports.TeamGetPostToUpdate = async (req, res) => {

  let query =  {slug: req.params.slug, author: req.user._id }; 
  if(res.locals.team)
  {
  query = {slug: req.params.slug, author: req.user._id, team_id: res.locals.team._id}; 
  }
  const post = await Post.findOne(query).populate('author');
  if (!post) 
  {
    res.redirect('/error'); 
    return;
  }
  res.render('dashboard/forum/edit.hbs', { title: `Edit ${post.title}`, post,  cybersecurity:`${req.csrfToken()}`});
};

//verifies the post
exports.verifyPost = async (req, res, next) => {
  const post = await Post.findOne({ _id: req.body.id, author: req.user._id });
  if (!post) {
    res.redirect('/error'); 
    return;
  }
  next();
};

//edits and updates the post on the main forum
exports.updatePost = async (req, res) => {
  const post = await Post.findOneAndUpdate(
    {
      _id: req.body.id,
    },
    req.body,
    { new: true, runValidatos: true },
  ).exec();
  req.flash('success', `Successfully updated ${post.title}`);
  res.redirect(`/forum/post/${post.slug}`);
};

//edits and updates the post on the team forum
exports.updatePostTeam = async (req, res) => {
  const post = await Post.findOneAndUpdate(
    {
      _id: req.body.id,
    },
    req.body,
    { new: true, runValidatos: true },
  ).exec();
  req.flash('success', `Successfully updated ${post.title}`);
  res.redirect(`/dashboard/forum/post/${post.slug}`);
};

//retrieves the post on the main forum by comparing the query to the content of the posts
exports.searchPost = async (req, res) => {
  const searchTerm = req.query.q;

  const posts = await Post.find({ 
    team_id:null, 
    $text: {
      $search: req.query.q,
    },

  }, {
    score: { $meta: 'textScore' },
  }).sort({
    score: { $meta: 'textScore' },
  }).sort({ created: -1 }).populate('author');
  res.render('forum/search.hbs', { title: `Search results for: ${searchTerm}`, pageTitle: searchTerm, posts });
};


//retrieves the post on the team forum by comparing the query to the content of the posts
exports.TeamSearchPost = async (req, res) => {
  const searchTerm = req.query.q;
  let query = null; 
  if(res.locals.team)
  {
   query = res.locals.team._id;
   console.log(query); 
  }
  const posts = await Post.find({ 
    team_id:query, 
    $text: {
    $search: req.query.q,
    },

  }, {
    score: { $meta: 'textScore' },
  }).sort({
    score: { $meta: 'textScore' },
  }).sort({ created: -1 }).populate('author');
  res.render('dashboard/forum/search.hbs', { title: `Search results for: ${searchTerm}`, pageTitle: searchTerm, posts });
};