const { User } = require('../models')

module.exports = {
    async getUsers(req, res) {
        const users = await User.find()
        .select('-__v')
        // populate references the row name in users object. when we set that relationship up tho, ref goes to the document name
        .populate('thoughts')
        res.status(200).json(users)
    },
    async getOneUser(req, res) {
        const user = await User
        .find({ _id: req.params.id })
        res.status(200).json(user)

    }
}

// we'll need .populate for populating reactions to thoughts rather than user, which uses full blown foreign keys (i think??)
// lets try setting up some thoughts to see