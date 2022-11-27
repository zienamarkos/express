require('dotenv').config();
const express = require('express');
const Joi = require('joi');
const app  = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

const posts = [
    {username:"zena",title:"post1"},
    {username:"sol",title:"post2"},
]

const courses=[
    {id:1,name:"course1"},
    {id:2,name:"course2"},
    {id:3,name:"course3"},
]

app.get('/',(req,res)=>{
    res.send('hello from express!!!');
});
app.get('/api/courses',(req,res)=>{
    res.send(courses);
});
app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id)) ;
    if (!course) res.status(404).send('the course with this id doesn\'t exist!');
    res.send(course);
});

app.post('/api/courses/',(req,res)=>{
    if(!req.body.name || req.body.name.length<3){
        res.status(400).send('the name is required and should be minimum of 3 characters');
        return;
    }
    const course={
        id:courses.length + 1,
        name:req.body.name,
    };
    courses.push(course);
    res.send(course);
});
app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if (!course) res.status(404).send('the course with this id doesn\'t exist!');
    course.name = req.body.name;
    res.send(course);
})

app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) res.status(404).send('the course with this id does\'t exist');

    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);
});

app.post('/api/login',(req,res)=>{
    const username=req.body.username;
    const user={name:username};

    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
    res.send({accessToken:accessToken});
});

function authorizationToken(req,res,nex){
    const header = req.header['authorization']
}

const port = process.env.PORT || 3000;
app.listen(port,()=>
console.log(`listening on port ${port}...`));