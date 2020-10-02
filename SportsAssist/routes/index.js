const express = require('express');

const router = express.Router();

// Controllers

const formationController = require('../controllers/formationController'); 
const forumController = require('../controllers/forumController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const teamController = require('../controllers/teamController'); 
const trainingController = require('../controllers/trainingController'); 
const videoController = require ('../controllers/videoController'); 
const commentController = require('../controllers/commentController');
const squadController = require('../controllers/squadController'); 
const dashboardController = require('../controllers/dashboardController'); 
const gymController = require('../controllers/gymController');
const nutritionController = require('../controllers/nutritionController');
const noticeController = require('../controllers/noticeController');
// Error Handlers

const { catchErrors } = require('../handlers/errorHandlers');

// Landing Page

router.get( '/', authController.notLoggedIn, catchErrors(userController.getMasterHomePage),);
router.post('/addContact',userController.addContactUs);

// Login

router.post('/login', authController.notLoggedIn,authController.login,teamController.setTeamArrayCookieDriver,);
router.get('/login',authController.notLoggedIn,authController.getLoginPage,);

// Signup

router.post('/signup',authController.notLoggedIn,userController.validateRegister,userController.checkUserExists,userController.registerUser,authController.login,);
router.get('/signup',authController.notLoggedIn,userController.getRegisterPage,);

// Logout

router.get('/logout',authController.isLoggedIn,teamController.destroyTeamCookie, teamController.destroyTeamArrayCookie, authController.logout,);

// Terms

router.get('/terms',userController.termsGen,);

// Account

router.get('/account',authController.isLoggedIn,forumController.getUserPosts,);
router.post('/account',authController.isLoggedIn,catchErrors(userController.updateUser),);
router.post('/account/delete',authController.isLoggedIn,catchErrors(userController.deleteUser),);
router.get('/account/delete',authController.isLoggedIn,userController.getDeletePage,);

// Teams

router.get('/teams',authController.isLoggedIn, teamController.hasTeam, teamController.destroyTeamCookie,teamController.setTeamArrayCookieDriver, userController.teamListGen,);

// Teams Related Pages

router.get('/teams/new', teamController.showTeamCreationWizard,); 
router.post('/addTeam', teamController.addTeam,); 
router.post('/teams/new', teamController.userNewTeam, teamController.setTeamArrayCookieDriver,); 
router.get('/teamNotFound', teamController.team404,); 
router.get('/generateNewRelationForCoach',userController.isManager ,teamController.generateNewRelationForCoach,); 

// Forum

router.get('/forum', catchErrors(forumController.getIndexPage),); 

// Forum Related Pages

router.post('/forum/add',authController.isLoggedIn,catchErrors(forumController.newPost),);
router.get('/forum/post/:slug',catchErrors(forumController.getPostBySlug),);
router.post('/comment', authController.isLoggedIn,catchErrors(commentController.newComment),);
router.get('/forum/post/:slug/edit', authController.isLoggedIn,catchErrors(forumController.getPostToUpdate),);
router.post('/forum/post/:slug/edit', authController.isLoggedIn,catchErrors(forumController.verifyPost),catchErrors(forumController.updatePost),);
router.get('/forum/search',catchErrors(forumController.searchPost),);
router.get('forum/page/:page',catchErrors(forumController.getIndexPage),);
router.post('/deletePost',authController.isLoggedIn,catchErrors(forumController.deletePost),);

// Dashboard

router.get('/dashboard', authController.isLoggedIn, teamController.hasTeamCurrently, dashboardController.dashboardGen,);
router.post('/dashboard', teamController.teamCookieDriver, dashboardController.dashboardGen,);

// Dashboard Related Pages

router.get('/dashboard/email', squadController.getEmailArea,);
router.get('/dashboard/details',authController.isLoggedIn,teamController.hasTeamCurrently, dashboardController.detailsGen,);
router.get('/dashboard/leave',authController.isLoggedIn,teamController.hasTeamCurrently, dashboardController.leaveGen,);
router.get('/dashboard/gym',authController.isLoggedIn, teamController.hasTeamCurrently, gymController.getGymPage,);
router.get('/dashboard/formations',teamController.hasTeamCurrently, formationController.getUsersFormations,); 
router.get('/dashboard/training',authController.isLoggedIn,teamController.hasTeamCurrently,dashboardController.trainingGen,);
router.get('/dashboard/forum',authController.isLoggedIn,teamController.hasTeamCurrently,catchErrors(forumController.getTeamIndexPage),);
router.get('/dashboard/squad', authController.isLoggedIn,teamController.hasTeamCurrently, catchErrors(squadController.hubGen),);
router.post('/dashboard/leave',authController.isLoggedIn,teamController.hasTeamCurrently,teamController.leaveTeam,teamController.destroyTeamArrayCookie, teamController.destroyTeamCookie, authController.notLoggedIn,);

//Dashboard/Nutrition Related Pages
router.get('/dashboard/nutrition',authController.isLoggedIn,teamController.hasTeamCurrently,nutritionController.getNutritionPage,);
router.post('/dashboard/nutrition',authController.isLoggedIn, nutritionController.addNutrition,);

// Dashboard Fixtures & Results Related Pages
router.get('/dashboard/results',authController.isLoggedIn,dashboardController.resultsGen,);
router.post('/dashboard/results',catchErrors(dashboardController.addResult),);
router.post('/dashboard/results/delete',catchErrors(dashboardController.deleteResult),);

router.get('/dashboard/fixtures',authController.isLoggedIn, teamController.hasTeamCurrently, dashboardController.fixturesGen,);
router.post('/dashboard/fixtures',dashboardController.addFixture,);
router.post('/dashboard/fixtures/delete',authController.isLoggedIn, userController.isManager,teamController.hasTeamCurrently,catchErrors(dashboardController.deleteFixture),);

// Dashboard/Video Related Pages
router.get('/dashboard/video',authController.isLoggedIn,teamController.hasTeamCurrently, videoController.getVideoAnalysisPage,); 
router.post('/dashboard/video',authController.isLoggedIn,userController.isManager,teamController.hasTeamCurrently,catchErrors(videoController.addVideo),);
router.post('/dashboard/video/delete',authController.isLoggedIn,userController.isManager,teamController.hasTeamCurrently,catchErrors(videoController.deleteVideo),);
router.get('/dashboard/video/:code',authController.isLoggedIn,teamController.hasTeamCurrently, catchErrors(videoController.getVideoByCode),);

// Dashboard/Settings Related Pages
router.get('/dashboard/settings',authController.isLoggedIn,userController.isManager,teamController.hasTeamCurrently,dashboardController.settingsGen,)
router.post('/dashboard/settings',authController.isLoggedIn, userController.isManager,teamController.hasTeamCurrently,teamController.updateTeam,);
router.get('/dashboard/settings/delete',authController.isLoggedIn,userController.isManager,teamController.hasTeamCurrently,dashboardController.deleteGen,);
router.post('/dashboard/settings/delete',authController.isLoggedIn,userController.isManager,teamController.hasTeamCurrently,teamController.deleteTeam,teamController.destroyTeamArrayCookie, teamController.destroyTeamCookie, authController.notLoggedIn,);

// Dashboard/Forum Related Pages

router.get('/dashboard/forum/post/:slug/edit', authController.isLoggedIn,teamController.hasTeamCurrently, catchErrors(forumController.TeamGetPostToUpdate),); 
router.get('/dashboard/forum/post/:slug',authController.isLoggedIn,teamController.hasTeamCurrently,catchErrors(forumController.getPostBySlug),);
router.get('/dashboard/forum/search',authController.isLoggedIn,teamController.hasTeamCurrently,catchErrors(forumController.TeamSearchPost),);
router.post('/dashboard/forum/add',authController.isLoggedIn,teamController.hasTeamCurrently,catchErrors(forumController.TeamNewPost),);
router.post('/dashboard/forum/post/:slug/edit',authController.isLoggedIn,teamController.hasTeamCurrently,catchErrors(forumController.verifyPost),catchErrors(forumController.updatePostTeam),);
router.post('/deletePostTeam',authController.isLoggedIn,teamController.hasTeamCurrently,catchErrors(forumController.deleteTeamPost),);


// Dashboard/Formations Related Pages

router.post('/newFormation', authController.isLoggedIn,teamController.hasTeamCurrently, formationController.addFormation,); 
router.post('/dashboard/copyFormation',  authController.isLoggedIn,teamController.hasTeamCurrently,formationController.copyFormation,);
router.get('/dashboard/formations/:id', authController.isLoggedIn, teamController.hasTeamCurrently, formationController.getFormationWithId,); 
router.delete('/dashboard/formations/:_id', authController.isLoggedIn,teamController.hasTeamCurrently, formationController.deleteFormation,); 
router.put('/dashboard/formations/:_id', authController.isLoggedIn,teamController.hasTeamCurrently, formationController.saveFormation,); 
router.post('/dashboard/formations/:id', authController.isLoggedIn,teamController.hasTeamCurrently, formationController.addCommentFormation,);


// Dashboard/Training Related Pages

router.get('/dashboard/training', authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getIndividual,); 
router.get('/dashboard/training/individual', authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getIndividual,); 
router.get('/dashboard/training/team', authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getTeam,); 
router.get('/dashboard/training/team/warmup', authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getWarmup,); 
router.get('/dashboard/training/individual/create', authController.isLoggedIn,teamController.hasTeamCurrently, trainingController.getTrainingCreator,)
router.post('/dashboard/training/individual/create', authController.isLoggedIn,teamController.hasTeamCurrently, trainingController.postTraining,);  
router.get('/dashboard/training/team/shooting', authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getShooting,); 
router.get('/dashboard/training/team/passing', authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getPassing,); 
router.get('/dashboard/training/team/keeping', authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getKeeping,); 
router.get('/dashboard/training/team/dribbling',authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getDribbling,); 
router.get('/dashboard/training/team/defending',authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getDefending,);
router.get('/dashboard/training/team/cooldown',authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getCooldown,);
router.post('/dashboard/training/individual/sessions',authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getTrainings,); 
router.get('/dashboard/training/team',authController.isLoggedIn,teamController.hasTeamCurrently,catchErrors(dashboardController.teamTrainingGen),);
router.get('/dashboard/training/individual',authController.isLoggedIn,teamController.hasTeamCurrently,catchErrors(dashboardController.individualTrainingGen),);

// Dashboard/Email Related Pages

router.post('/dashboard/email', squadController.sendTeamEmail,);

// Dashboard/Gym Related Pages

router.post('/dashboard/gym', gymController.addWorkout,);

// Dashboard/Squad Related Pages

router.post('/dashboard/squad', squadController.updateProc,);
 
// Dashboard/Noticeboard Related Pages

router.get('/dashboard/noticeboard/create', catchErrors(noticeController.createNoteGen));
router.post('/dashboard/noticeboard/create', catchErrors(noticeController.addNewNote));  
router.post('/dashboard/noticeboard', noticeController.noticeboardGen,);

 

module.exports = router;
