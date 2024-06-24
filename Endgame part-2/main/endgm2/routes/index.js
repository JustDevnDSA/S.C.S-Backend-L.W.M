var express = require('express');
var router = express.Router();
const userModel = require('./users')
const passport = require('passport');
const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()))


route.get('/profile',isLoggedIn, function (req ,res){
  res.send('welcome to your profile')
})

router.post('/register', function (req, res) {
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret
  });

  userModel.register(userdata, req.body.password)
    .then(function (registeredUser) {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile');
      });
    })
});

router.post('/login',passport.authenticate("local",{
  successRedirect:'/profile',
  failureRedirect:'/'
}),function (req,res){})


router.get('/logout',function (req,res,next){
  req.logout(function(err){
    if(err){return next(err)}
    res.redirect('/')
  })
})

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/')
}



// INTERMEDIATE MONGODB STARTS HERE
// router.get('/create',async(req,res)=>{
//   let userdata = await userModel.create({
//     username:"harshi",
//   nickname:"harshiiiii",
//   discription:"hello everyone",
//   categories:['fashion','life','science'],
//   })
//   res.send(userdata)
// })

// router.get('/find', async (req,res)=>{
//   // doing case insenstive search in mongoose
//   /*
//   // new RegExp(search,flags)
//    var regex =new RegExp("^harShiTa$",'i')
//   let user = await userModel.find({username:regex})
//   res.send(user)
//   */

//   // q2 - finding on the basis of tags/etc..
//   // let user = await userModel.find({categories : {$all : ['js']}})
//   // res.send(user)

//   // q3 - finding in a specific time range
//   // var date1 = new Date('yyyy-mm-dd') 
//   /*var date1 = new Date('2024-05-18') 
//   var date2 = new Date('2024-06-21') 

//   let user = await userModel.find({datecreated:{$gte:date1,$lte:date2}})
//   res.send(user) */

//   // q4 - how to filter out on the basis of field
//   /*let user= await userModel.find({categories:{$exists:true}})
//   res.send(user) */

//   // q5 - how to filter out on specific field length
//   let user = await userModel.find({
//     $expr:{
//       $and:[
//         {$gte: [{$strLenCP: '$nickname'},0]},
//         {$lte: [{$strLenCP: '$nickname'},12]}
//       ]
//     }
//   })
//   res.send(user)

// })


// FLASH CODE STARTS HERE
/*
router.get('/failed', function(req, res) {
  // agar login hojaaye to login page ke baad profile page dikha do
  //agar  naa ho to phir, muje is route se kisi aur route le jaao jaise ki /error and wha pr dikhao failed
  // flash message aapko allow krte hai ki aap is route mein bane huye data ko dusre route mein use kr sko

  // req.flash("naam",data)
  req.flash("age",20)
  req.flash("name","Harsh")
  res.send("bangya")
});

router.get('/checkkaro', function(req, res) {
  console.log(req.flash("age"));
  console.log(req.flash("name"));
  res.send("terminal check karo")

}); */
// FLASH CODE ENDS HERE



module.exports = router;
