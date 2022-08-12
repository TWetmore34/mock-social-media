const { Thought, User } = require('../models')

module.exports = {
    async getThoughts(req, res) {
        const thoughts = await Thought.find()
        res.status(200).json(thoughts)
    },
    async getOneThought(req, res) {
        try {
        const thought = await Thought.find({ _id: req.params.thought_id })
        res.status(200).json(thought)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    async createThought(req, res) {
        try {
            // create thought
            const newThought = await Thought.create(req.body)
            // update user

            const test = await User.findOneAndUpdate(
                { username: newThought.username },
                { $push: { thoughts: newThought._id } },
                { new: true }
                )
            console.log(test)
            res.status(200).json(newThought)
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}