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
            res.status(200).json(newThought)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    // update
    async updateThought(req, res) {
        const updatedThought = await Thought.findOneAndUpdate(
            { _id: req.params.thought_id},
            { $set: req.body },
            { runValidators: true, new: true }
        )
            res.status(200).json(updatedThought)
    },
    // delete
    async deleteThought(req, res) {
        const deleted = await Thought.findOneAndDelete(
            {_id: req.params.thought_id}
        )
        res.status(200).json({ msg: 'thought deleted', deleted })
    },
    async createReaction(req, res) {
        try {
        const updatedThought = await Thought.findOneAndUpdate(
            { _id: req.params.thought_id },
            { $push: { reactions: req.body } }
        )
        res.status(200).json(updatedThought)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    async getReactions(req, res) {
        try {
        const thought = await Thought.find({ _id: req.params.thought_id })
        res.status(200).json(thought[0].reactions)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    async updateReaction(req, res) {
        try {
            // find the reaction
            const thought = await Thought.find({ _id: req.params.thought_id })
            const reaction = thought[0].reactions.filter(reaction => reaction._id.toString() === req.params.reaction_id)

            // update into new reaction

            // pull the old reaction

            // push the new reaction
            res.status(200).json(reaction)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    // delete reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thought_id },
                { $pull: { reactions: { _id: req.params.reaction_id } } }
                )
            res.status(200).json(thought)
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}