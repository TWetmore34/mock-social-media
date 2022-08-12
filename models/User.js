const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { 
        type: String, 
        unique: true, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        unique: true, 
        required: true,  
        validate: [validateEmail, 'Please enter a valid email'],
        match: [/[A-Za-z0-9\s]+@[A-Za-z\s]+/, 'Please enter a valid email address']
    },
    // doesnt currently exist
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const User = model('user', userSchema)

module.exports = User