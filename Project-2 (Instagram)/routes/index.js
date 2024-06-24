var express = require("express");
const userModel = require("./users");
const postModel = require("./posts");
const passport = require("passport");
var router = express.Router();
const localStrategy = require("passport-local");
const upload = require("./multer");
const posts = require("./posts");

// helping user to get logged in
passport.use(new localStrategy(userModel.authenticate()));

router.get("/", (req, res) => {
  res.render("index", { footer: false });
});

router.get("/login", (req, res) => {
  res.render("login", { footer: false });
});

router.get("/feed", isLoggedIn,async (req, res) => {
  const posts = await postModel.find().populate('user')
  res.render("feed", { footer: true,posts });
});

router.get("/profile", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user }).populate('posts')

  res.render("profile", { footer: true, user });
});

router.get("/search", isLoggedIn, (req, res) => {
  res.render("search", { footer: true });
});

router.get('/like/post:id',isLoggedIn,async (req,res)=>{
    const user = await userModel.findOne({username:req.session.passport.user})
    const post = await postModel.findOne({_id:req.params.id})

    // if alredy liked remove like
    // if not liked, like it

    if(post.likes.indexOf(user._id)=== -1){
      post.likes.push(user._id);
    }
    else{
     post.likes.splice(post.likes.indexOf(user._id),1)
    }

    await post.save()
    res.redirect('/feed')
})

router.get("/edit", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  res.render("edit", { footer: true, user });
});

router.get("/upload", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user });

  res.render("upload", { footer: true, user });
});

router.post("/register", (req, res, next) => {
  const userData = new userModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
  });
  // creating account
  userModel.register(userData, req.body.password).then(() => {
    // processing to log in
    passport.authenticate("local")(req, res, () => {
      // redirecting to profile after log in
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post("/update", upload.single("image"), async function (req, res) {
  const user = await userModel.findOneAndUpdate(
    { username: req.session.passport.user },
    { username: req.body.username, name: req.body.name, bio: req.body.bio },
    { new: true }
  );

  if (req.file) {
    user.profileImage = req.file.filename;
  }

  await user.save();
  res.redirect("/profile");
});

router.post("/upload",isLoggedIn,upload.single('image'),async (req,res)=>{
  const user = await userModel.findOne({username:req.session.passport.user})

  const post = await postModel.create({
    picture:req.file.filename,
    user:req._id,
    caption:req.body.caption
  })

  user.posts.push(post._id)
  await user.save()
  res.redirect('/feed')

})

router.get('/username/:username',isLoggedIn,  async function(req,res){
  const regex = new RegExp(`^${req.params.username}`,'i')
  const users = await userModel.find({username:regex})
  res.json(users)
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;
