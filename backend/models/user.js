const mongoose = require('mongoose');

const uniqueValidator = require("mongoose-unique-validator");

mongoose.connect('mongodb://localhost:27017/sprintData',{useNewUrlParser:true});

var mongoSchema=mongoose.Schema;

const userSchema = mongoSchema({
    role: { type:String, required:true },
    email: { type:String, required:true, unique:true },
    password: { type:String, required:true },
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);