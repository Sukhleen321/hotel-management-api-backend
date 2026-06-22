const express = require('express')
const app = express()
require('dotenv').config();   //env before db
const db = require('./db')

const passport = require('./auth');  //FOR AUTHENTICATION
const LocalStratergy = require('passport-local').Strategy;

const Person = require('./models/Person')
const MenuItem = require('./models/MenuItem')

const bodyParser = require('body-parser');  //body parser converts JSON DATA TO OBJECT and store in BODY
app.use(bodyParser.json()); 

//Middleware Function
const logRequest = (req,res,next)=> {
  console.log(`${new Date().toLocaleString()} Request Made to: ${req.originalUrl}`);
  next();
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})

app.get('/', function (req, res) {       // now http://localhost:3000/ url
  res.send('Welcome to my Hotel.... How can i help you? ,We have list of menus')
})

const personRoutes = require('./Routes/personRoutes');
app.use('/person', localAuthMiddleware, personRoutes);

const menuRoutes = require('./Routes/menuRoutes');
app.use('/menu',menuRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000')
})

