const { User } = require('../models')

module.exports = {
    async getUsers(req, res) {
        const users = await User.find()
        res.status(200).json(users)
    }
}