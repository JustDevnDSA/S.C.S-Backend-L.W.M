const express = require("express");
const router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");
const passport = require("passport");
const upload = require("./multer");

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

// Render index page or Register Route
router.get("/", (req, res) => {
  res.render("index", { title: "Register" });
});

// Login route
router.get("/login", (req, res) => {
  // console.log(req.flash('error'));
  res.render("login", { error: req.flash("error") });
});

// Feed Page route
router.get("/feed", (req, res) => {
  res.render("feed");
});

// Upload route
router.post("/upload", iSLoggedIn, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(404).send("No files were given.");
  }
  // res.send('Files uploaded successfully !')
  // jo file upload hui hai use save kro as a post and uska postid user ko do and post ko userid do
  const user = await userModel.findOne({ username: req.session.passport.user });

  const post = await postModel.create({
    image: req.file.filename,
    imageText: req.body.filecaption,
    user: user._id,
  });

  user.posts.push(post._id)
  await user.save()
  // res.send('done')
  res.redirect('/profile')
});

// Profile Route
router.get("/profile", iSLoggedIn, async (req, res) => {
  // res.send("Welcome to Your Profile");
  const user = await userModel.findOne({
    username: req.session.passport.user,
  })
  .populate("posts");
  // console.log(user);
  res.render("profile", { title: "Profile Page", user });
});

// Register new user
router.post("/register", (req, res) => {
  const { username, email, fullname, password } = req.body;
  const userData = new userModel({ username, email, fullname });
  userModel.register(userData, password, () => {
    passport.authenticate("local")(req, res, () => {
      res.redirect("/profile");
    });
  });
});

// Login user
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

function iSLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/");
}

module.exports = router;
