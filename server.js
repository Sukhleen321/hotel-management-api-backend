const express = require('express')
const app = express()

require('dotenv').config();   //env before db
const db = require('./db')

const Person = require('./models/Person')
const MenuItem = require('./models/MenuItem')

const bodyParser = require('body-parser');  //body parser converts JSON DATA TO OBJECT and store in BODY
app.use(bodyParser.json()); 


app.get('/', (req, res) => {  // now http://localhost:3000/ url
  res.send('Welcome to my Hotel.... How can i help you? ,We have list of menus')
})

const personRoutes = require('./Routes/personRoutes');
app.use('/person',personRoutes);

const menuRoutes = require('./Routes/menuRoutes');
app.use('/menu',menuRoutes);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000')
})

