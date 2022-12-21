const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt =require('bcryptjs');


const user = require('../models/user');



module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'email', passwordField: 'password'},(email,password,done)=>{
            // matching the user from the database

            user.findOne({email: email })
            .then(User =>{
                if(!User){
                    return done(null, false,{message:'the email is not registered in our database'});
                }

                // matching the password for the user

                bcrypt.compare( password, User.password, (err,isMatch)=>{
                    if(err) throw err;

                    if(isMatch){
                        return done(null,User)
                    }
                    else{
                        return done(null, false, {message:'password incorrect'})
                    }
                } )
            } )
            .catch(err => console.log(err))
        }
     )
     );

     passport.serializeUser((User, done)=> {
        return done(null, User.id)
      });
      
      passport.deserializeUser((id, done)=> {
        user.findById(id, (err,User)=>{
            return done(err,User);
        });
      });
}