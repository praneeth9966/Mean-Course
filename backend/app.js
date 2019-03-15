// HShKp0N0Ldarh1jV

const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();
//  mongoose.connect("");
 mongoose.connect("mongodb+srv://praneeth:HShKp0N0Ldarh1jV@cluster0-wwas6.mongodb.net/node-angular")
 .then(()=>{
     console.log('connected to database !');
 })
 .catch(()=>{
     console.log("connection failed!");
 })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req,res,next)=>{
    // res.setHeader("Access-Control-Allow-Origin","*");
    // res.setHeader("Access-Control-Allow-Origin",
    // "Origin, X-Requested-With, Content-Type, Accept");
    // res.setHeader("Access-Control-Allow-Methods",
    // "GET, POST, DELETE, PATCH, OPTIONS");
    // next();
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);


module.exports = app;