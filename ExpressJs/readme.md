node vs express, what is the real deal ?
-node is the main thing but express ke code se hum server ka code likh pate and server and server kaisa react krega wo bhi express ke help se likhte hai

what is express js?
- package , routing

why express js?
- http is difficult to use, express make this easier

Routing
-routes banane ke process ko hum khte hai routing 
-/profile, /home, /contact
- /profile/harsh/kjksfjds/jhjfhjfhdfj

Middleware
-middleware ek aisa function hota hai jo har route se phle chlta hai, iska matlb saare routes mein koi bhi chale usse phle middleware chalta hai and usmein code phle execute hota hai

Request and Response and next
-req mein saara data hota hai aane wale user ki request ki tarf ka,like uski location, device info and other thuings, res mein controls hote hai jinke basis pe hum server se response bhej paate hai. next is just a push so that our request moves to the next thing which should be executed

Route parameters
-to make any route dynamic you can use : at the place where you want to make it dynamic, and to access their value use req.params.---
/author/books/issued/harsh
/author/books/issued/harshita
/author/books/issued/harshit
-----> 
/author/books/issed/:username

Template Engine
- ejs , pug , handlebar , ....
- ye ek style of markup se convert krke aapko html dete hai
- ejs is very very similar to html
- ek markup style jo ki baad mein convert ho jaegi html mein

Static files
- images, styleshets, frontend js setup

HTTP methods - get and post


Error Handling
-