
const Joi = require('joi');
const config = require('config');
const startupDebug = require('debug')('app:debug');
const logger = require('./logger');
const express = require('express');
const app = express();
app.use(express.json());
app.use(logger);
var courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
    {id: 4, name: 'course4'}
];
// get configuration setting 
startupDebug('Application Password :' );
//console.log('Application mail server :'+ config.get('mail.host'));
// get list of all courses 
app.get('/api/courses/', (req,res)=> {
    res.send(courses);
});
//get a specific course with the known ID
app.get('/api/courses/:id', (req,res)=> {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    res.send(course);
   });

app.post('/api/courses', (req,res)=> {
    const {error} = validation(req.body);
    if (error){
      res.status(400).send(error.details[0].message);
      return; }
    const course = {
            id: courses.length +1,
            name: req.body.name
    };
    courses.push(course);
    res.send(course);
});
 // put request - to update data 
app.put('/api/courses/:id', (req,res)=> {
     // check if id is avaialable- if not bad request 404
     const course = courses.find( c => c.id === parseInt(req.params.id));
     if(!course)
        return res.status(404).send('Course with this id does not found');
        
     // check if data provided for updation is valid
     const {error} = validation(req.body);
     if (error){
       res.status(400).send(error.details[0].message);
       return; }
    // if everything is good, update the course and return it to the client
     course.name = req.body.name;
     res.send(course);
 });
 // Delete a course from the courses array by a known valid ID
 app.delete('/api/courses/:id', (req,res)=> {
    // check if id is avaialable- if not bad request 404
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) 
      return res.status(404).send('Course with this id does not found');
      // if valid id delete the course 
      const index = courses.indexOf(course);
      courses.splice(index,1);
      res.send(course);
 });
 
// VALIDATION FUNCTION
 function validation(course) {
    const schema = {
        name: Joi.string().min(3).required() };
        return Joi.validate(course,schema);
 }

const port = process.env.port || 3000;
app.listen(port, ()=>{ console.log(`listening on port  ${port}`)});