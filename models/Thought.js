const { Types, Schema, model } = require('mongoose');
// sub document for thoughts
reactionSchema = new Schema({
    // removed this section for now because it made it much easier to delete and update reactions working from the normal random generated ids
    // reactionId: {
    //     type: Schema.Types.ObjectId,
    //     default: () => new Types.ObjectId()
    // },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    // user who posted reaction
    username: {
        type: String,
        required: true
    },
    // make getter for formatting
    createdAt: {
        type: Date,
        default: () => new Date()
    }
})


thoughtSchema = new Schema({
    // body
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    // set up getter to format
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    // user who posted
    username: {
        type: String,
        required: true
    },
    // stored array of reactions
    reactions: [reactionSchema]  
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought