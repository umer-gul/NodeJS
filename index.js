
const Joi = require('joi');
const config = require('config');
const startupDebug = require('debug')('app:debug');
const logger = require('./logger');
const express = require('express');
const app = express();
const courses = require('./routes/courses');
const home = require('./routes/home');

app.use('/', home);
app.use('/api/courses', courses);
//app.use(express.json());
app.use(logger);

app.set('view engine', 'pug');
app.set('views', './views');


// get configuration setting 
startupDebug('Application Password :' );




const port = process.env.port || 3000;
app.listen(port, ()=>{ console.log(`listening on port  ${port}`)});