// HShKp0N0Ldarh1jV
// eLfzYVLH9994ANOT

const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

const userRoutes = require('./routes/user');

const app = express();


// mongoose.connect("mongodb+srv://bunny:eLfzYVLH9994ANOT@cluster0-m0f4v.mongodb.net/test?retryWrites=true")
// .then(()=>{
//          console.log('connected to database !');
//      })
//      .catch((err)=>{
//          console.log(err);
         
//          console.log("connection failed!");
//      })


//node-angular is the database name
//  mongoose.connect("mongodb+srv://praneeth:" + process.env.MONGO_ATLAS_PW + "@cluster0-wwas6.mongodb.net/node-angular")
//  .then(()=>{
//      console.log('connected to database !');
//  })
//  .catch((err)=>{
//      console.log(err);
     
//      console.log("connection failed!");
//  })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
// app.use((req, res, next)=> {
//     res.sendFile(path.join(__dirname, "angular", "index.html")); 
// });

module.exports = app;