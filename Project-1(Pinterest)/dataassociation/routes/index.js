var express = require('express');
var router = express.Router();
const userModel = require('./users')
const postModel = require('./posts')


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createuser', async function(req, res, next) {
  let createduser = await userModel.create({
    username: "harsh",
    password: 'harsh',
    posts: [],
    email:'harsh@mail.com',
    fullName: 'Harsh Vandana Sharma',
  })
  res.send(createduser)
});

router.get('/createpost', async function(req, res, next) {
  let createdpost = await postModel.create({
   postText: 'This is another post text',
   user:"6673c360421736c85d7a0ac9"
  });
  let user = await userModel.findOne({_id:"6673c360421736c85d7a0ac9"})
  user.posts.push(createdpost._id)
  await user.save()

  res.send("done")
  // res.send(createdpost)
});

router.get('/alluserpost', async function(req, res, next) {
  let user = await userModel
  .findOne({_id:'6673c360421736c85d7a0ac9'})
  .populate('posts')

  res.send(user)
});

module.exports = router;
