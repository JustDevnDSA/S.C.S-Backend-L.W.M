var express = require('express');
const userModel = require('./users');
const postModel = require('./post');
const passport = require('passport');
const upload = require('./multer');
var router = express.Router();
const localStrategy = require('passport-local').Strategy;


passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' , nav:false});
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' ,nav:false});
});

router.get('/profile', isLoggedIn,async function(req, res, next) {
  const user  = await userModel
  .findOne({username:req.session.passport.user})
  .populate('posts')

  res.render('profile',{title:'Profile',user,nav:true});
});

router.get('/show/posts', isLoggedIn,async function(req, res, next) {
  const user  = await userModel
  .findOne({username:req.session.passport.user})
  .populate('posts')

  res.render('show',{title:'All Posts',user,nav:true});
});

router.get('/add', isLoggedIn,async function(req, res, next) {
  const user  = await userModel.findOne({username:req.session.passport.user})
  res.render('add',{title:'Add',user,nav:true});  
});

router.get('/feed', isLoggedIn,async function(req, res, next) {
  const user  = await userModel.findOne({username:req.session.passport.user})

  const posts = await postModel.find().populate('user')

  res.render('feed',{title:'Feed',user,nav:true,posts});  
});

router.post('/createpost',upload.single('postimage'), isLoggedIn,async function(req, res, next) {
  const user  = await userModel.findOne({username:req.session.passport.user})
  const post = await postModel.create({
    user:user._id,
    title:req.body.title,
    description:req.body.description,
    image:req.file.filename
  })

  user.posts.push(post._id);
  await user.save()
  res.redirect('/profile')

});

router.post('/register', (req, res, next) => {
  const data = new userModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
  });

  userModel.register(data, req.body.password).then(function(){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile')
    })
  })
    
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/',
  successRedirect: '/profile'
}), (req, res, next) => {
  // Middleware function not necessary here
});

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.post('/fileupload',isLoggedIn,upload.single('image'),async function(req,res,next){
  const user = await userModel.findOne({username:req.session.passport.user})

  user.profileImage = req.file.filename;
  await user.save()

  res.redirect('/profile')
})  

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
