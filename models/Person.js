const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    username:{
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    }
});

personSchema.pre('save', async function(next){   //before saving bcrypting the data

    const person = this;
    if(!person.isModified('password'))return next();  //if only updating something not changing passowrrd just skip then already bcrypted

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;

        next();
    }
    catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword) {
    try{
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}

// prince ---> bdbebuebjebe7y38eh3jbeu3heb3
// login ---> agarwal

// bdbebuebjebe7y38eh3jbeu3heb3 ---> extract salt
// salt+agarwal ---> hash ---> svwsjwkmskwmswbshwvdhwjdnbejdne   // not same !!!


//Create Person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;