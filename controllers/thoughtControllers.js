const { Thought } = require('../models')

module.exports = {
    async getThoughts(req, res) {
        const thoughts = await Thought.find()
        res.status(200).json(thoughts)
    }
}