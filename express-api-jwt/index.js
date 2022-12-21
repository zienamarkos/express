
const express = require('express');
const expressLayout=require('express-ejs-layouts');
const app=express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');


require('./config/passport')(passport);



mongoose.set('strictQuery', true);
const db = require("./config/properties").MongoURI;
mongoose.connect(db).then(()=> console.log("mongodb successfully connected..."));


// layout
app.use(expressLayout);
app.set('view engine','ejs');

// body parsser
app.use(express.urlencoded({extended:false}));

// express session

app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session() );

// connect flash
app.use(flash());
// create global variables for the flash message.
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg  = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();

});

// ROUTES
app.use('/',require('./routes/home'));
app.use('/users',require('./routes/users'));


const port = process.env.PORT || 3000;
app.listen(port,console.log(`listening on port ${port}...`));