const express = require("express");
const app = express();

app.set("view engine","ejs")
app.use(express.static("./public"))

// middleware
app.use((req, res, next) => {
  next();
});

app.get("/", (req, res) => {
//   res.send("Hello World");
    res.render("index",{age:12})

});

app.get("/contact",(req,res)=>{
    // res.render('contact',{name:"harsh"})
    throw Error("Contact form ka error hai doston")
})

app.get("/profile", (req, res) => {
  res.send("Hello Profile");
});

app.get("/profile/:username", (req, res) => {
  res.send(`Hello Profile ${req.params.username} `);
});

app.get("/error", (req, res) => {
  throw Error("Something went wrong")
});

app.use(function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
})

app.listen(3000);
