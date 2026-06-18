const mongoose = require('mongoose');

//Define Person schema here
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    work:{
        type: String,
        enum: ['chef','waiter','manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    Salary:{
        type: Number,
        required: true
    }
});

//Create Person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;