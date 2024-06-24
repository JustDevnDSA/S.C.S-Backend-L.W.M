// npm => node package manager

// npm ko node ka playstore samjho

// npm ek jagah hai jha pr khoob sare packages milte hai

// package -> bani banayi features/chizee kehlate hai packages

// package === files of code

// npm === packages ka play store



// npm se kuch install krna

// install
// npm install

// use
// see website

// print result
// see usage on website

var figlet = require("figlet");

// figlet("Backend Development", function (err, data) {
//   if (err) {
//     console.log("Something went wrong...");
//     console.dir(err);
//     return;
//   }
//   console.log(data);
// });

// figlet("Learn What Matters", function (err, data) {
//   if (err) {
//     console.log("Something went wrong...");
//     console.dir(err);
//     return;
//   }
//   console.log(data);
// });

figlet("Backend", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});