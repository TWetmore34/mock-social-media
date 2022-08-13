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
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);



// solution was just removing the restrictions i had placed on the info display. i set it to only include the friend's username, but by changing that, friends arrya exists again
userSchema.virtual('friendCount').get(function () {
    return this.friends.length
  })

const User = model('user', userSchema)

module.exports = User