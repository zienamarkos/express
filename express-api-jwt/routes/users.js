const express=require('express');
const router=express.Router();
const user = require('../models/user');
const bcrypt = require('bcryptjs')
const passport= require('passport');

const {ensureAuthenticated} = require('../config/auth')

router.get('/login',(req,res)=>res.render('login'));
router.get('/register',(req,res)=>res.render('register'));
router.get('/dashboard',ensureAuthenticated,(req,res)=>res.render('dashboard', {name:req.user.name}));



router.post('/register', (req, res)=>{
    const {name,email,password,password2}=req.body;
    let errors =[];
        // validation
    if(!name || !email  || !password || !password2){
        errors.push({msg: "please fill all the forms"})
    };

    if(password !== password2){
        errors.push({msg:'password does not much'})
    };

    if(password.length < 6){
        errors.push({msg:'password must be minimum of 6 characters'})
    }

    if(errors.length != 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })             
    }
    else{
        user.findOne({email:email})
            .then(User=> {
                if(User){
                    errors.push({msg:'user already registered with this email'})
                    res.render('register',
                    {
                        errors,
                        name,
                        email,
                        password,
                        password2
                   })
                }
                else{
                    const newUser = new user({
                        name,
                        email,
                        password,
                        password2
                        
                    });
                        // hash password
                    bcrypt.genSalt(10,(err, salt)=> 
                        bcrypt.hash(newUser.password,salt,(err,hash)=>{
                            if(err) throw err;
                            // set password to hashed
                            newUser.password=hash;
                            newUser.password2=hash;
                            // save new user
                            newUser.save()
                                .then(
                                    req.flash('success_msg', 'you are now registered and can login'),
                                    res.redirect('/users/login'),
                                    console.log(newUser)
                                )
                                .catch(err=> console.log(err));
                        }
                        )

                    )
                }


            } )

    }
}   
);

router.post('/login', (req,res,next)=>{
    passport.authenticate('local', {
        successRedirect: '/users/dashboard',
        failureRedirect: '/users/login',
        failureFlash:true,
             
    })(req,res,next);
});

router.get('/logout', (req,res) => {
    req.logout((err)=>{
        if(err){return err;}
    });
    req.flash('success_msg', 'you are logged out')
    res.redirect('/users/login');
});

module.exports=router;