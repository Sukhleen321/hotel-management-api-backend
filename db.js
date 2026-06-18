const mongoose = require('mongoose');
require('dotenv').config();

//Define the MongoDB connection URL
// const mongoURL = 'mongodb://localhost:27017/hotels' //hotels is name of our database

// FROM MONGO DB ATLAS SITE
const mongoURL = process.env.DB_URL;

//Set up MongoDB Connection
mongoose.connect(mongoURL);     //new way 

//Get the default connection 
//Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

//Define event listeners for Database connection

db.on('connected',() => {
    console.log('MongoDB Connected');
})
db.on('error',(err) => {
    console.log('MongoDB connection error',err);
})
db.on('disconnected',() => {
    console.log('MongoDB Disconnected');
})

//Export the Database connection
module.exports = db;