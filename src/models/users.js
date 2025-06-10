const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//creating userschema with user fields
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password should not include the keyword "password"');
            }
        }
        
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error("Age must be a positive integer");
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//generating auth token on login and signup and concatinating with tokens array
userSchema.methods.generateAuthToken = async function (){

    const user = this;

    const token = jwt.sign({_id: user._id.toString()}, 'risheekauth');

    user.tokens = user.tokens.concat({token});

    await user.save();

    return token;
}


//custom method on user model for login function
userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({email});

    if(!user){
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Unable to login');
    }

    return user;
}

//user scheme middleware for password hashing
userSchema.pre('save', async function (next) {

const user = this;

if(user.isModified('password')){
    
    user.password = await bcrypt.hash(user.password, 8);

}

    next();
});


//loading userschema in user model
const User = mongoose.model('User', userSchema);



module.exports = User;