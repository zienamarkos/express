
const express = require('express');
const expressLayout=require('express-ejs-layouts');
const app=express();
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
const db = require("./config/properties").MongoURI;
mongoose.connect(db).then(()=> console.log("mongodb successfully connected..."));


// layout
app.use(expressLayout);
app.set('view engine','ejs');

// body parsser
app.use(express.urlencoded({extended:false}));

// ROUTES
app.use('/',require('./routes/home'));
app.use('/users',require('./routes/users'));


const port = process.env.PORT || 3000;
app.listen(port,console.log(`listening on port ${port}...`));