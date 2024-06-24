var express = require('express');
var router = express.Router();
const userModel = require('./users')

// COOKIE CODE STARTS
router.get("/",(req,res)=>{ 
  // res.cookie(naam,value)
  res.cookie("age",25)
  res.render('index')
})

router.get("/readcookie",(req,res)=>{
  // console.log(req.cookies);
  console.log(req.cookies.age);
  res.send("check")
})

router.get("/deletecookie",(req,res)=>{
  res.clearCookie("age")
  res.send('cokies is now cleared')
})

//SESSION CODE STARTS
// router.get("/",(req,res)=>{
//   req.session.ban = true;
//   res.render('index')
// })

router.get('/checkban',(req,res)=>{
  // console.log(req.session);
  if(req.session.ban === true){
    res.send("You are banned")
  }
  else{
    res.send("You are not banned !")
  }
  // console.log(req.session.ban);
  // res.send("check kiya hai console dekho")
})

router.get('/removeban',(req,res)=>{
  req.session.destroy((err)=>{
    if (err) throw err
    res.send("ban removed !!!")
  })
})
// SESSION CODE ENDS



// MONGO DB CRUD CODE STARTS
router.get("/create",async (req,res)=>{
  const createdUser = await userModel.create({
    username:"Harsh Teacher",
    name:"Harsh",
    age:25
  })
  res.send(createdUser)
})

router.get('/read',async(req,res)=>{
  let read = await userModel.find() //-> returns all
  //returns an array
  res.send(read)
  // let readone = await userModel.findOne({name:"Harsh"})
  // res.send(readone)
})

router.get('/delete',async (req,res)=>{
  let deletedUser = await userModel.findOneAndDelete({
    name:"Harsh"
  })
  res.send(deletedUser)
})

//MONGODB CODE ENDS



module.exports = router;
