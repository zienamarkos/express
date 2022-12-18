

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    password2:{
        type:String,
        required:true
    }

})

const user = mongoose.model('user',UserSchema);

module.exports = user;