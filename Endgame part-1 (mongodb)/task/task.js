//express js
// install
// express js boilerplate code
// express js ejs setup
    //install ejs
    // set view engine
    // create views folder
    // create ejs files
    //render ejs files inside route
//express static files setup
//architecture of public folder
const express = require('express')
const app = express()

app.set('view engine','ejs')
app.use(express.static("./public"))

app.get('/',(req,res)=>{
    res.render('home')
})


app.listen(3000)