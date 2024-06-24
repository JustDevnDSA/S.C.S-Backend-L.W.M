// express framework for node.js
// express ka use case => routing
// routing => GET POST PUT PATCH DELETE

const express = require('express')
const app = express()
const port = 3000

//middlware ek aisa function hai jo kisi bhi route se pahle chalta hai, jiska mtlb aapka route chalane se phle agar aap koi kaam karna chaahte ho to middleware ka upyog kiya jaa skta hai

// route pe chlne se phle prin kro chala on console
// route chalne se phle route pe hits counter ki value badhao

// iska mtlb route chlne se phle jo chalega wo hai middleware

// sirf ek dikkat hai agar middleware chal gya to requet jaam ho jati hai aur route tak nhi pahuch paati

app.use((req,res,next)=>{
    console.log('Hello from middleware');
    next();
})
app.use((req,res,next)=>{
    console.log('Hello from middleware2');
    next();
})

// app.get(route,function)
app.get("/",(req,res)=>{
    res.send("Home page welcomes you !!")
})

app.get("/profile",(req,res)=>{
    res.send("Profile mein aapka swagat hai!!")
})

app.listen(port,()=>{console.log('server running');})
