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
        // this email validate isnt working
        match: [/[A-Za-z0-9\s]+@[A-Za-z\s]+/, 'Please enter a valid email address']
    },
    thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }
],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
});

const User = model('user', userSchema)

module.exports = User