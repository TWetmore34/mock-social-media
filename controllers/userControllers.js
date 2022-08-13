const { User, Thought } = require('../models')

module.exports = {
    async getUsers(req, res) {
        const users = await User.find()
        .select('-__v')
        // populate references the row name in users object. when we set that relationship up tho, ref goes to the document name
        .populate('thoughts')
        .populate({
            path: 'friends',
            select: 'username'
        })
        // console.log(users[0].friends.length)
        res.status(200).json(users)
    },
    // finds user by req.params
    async getOneUser(req, res) {
        const user = await User
        .find({ _id: req.params.user_id })
        .select('-__v')
        .populate({
            path: 'thoughts',
            select: '-username'
        })
        .populate({
            path: 'friends',
            select: 'username'
        })
        res.status(200).json(user)
    },
    // creates new user
    async createNewUser(req, res) {
        try {
        let newUser = await User.create(req.body)
        res.status(201).json(newUser)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    // update user
    // need to find a way to stop this from being able to update the post's username prop
    async updateUser(req, res) {
        try {
        const updated = await User.findOneAndUpdate(
            { _id: req.params.user_id},
            { $set: req.body.thoughtText },
            { runValidators: true, new: true }
        );
        if(!updated) res.status(400).json({ msg: 'User not found' })
        else res.status(200).json(updated)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    // delete user
    async deleteUser(req, res) {
        try {
            const deleted = await User.findOneAndDelete({ _id: req.params.user_id })
            if(!deleted) res.status(400).json({ msg: 'User not found' })
            else {
                // this should delete all the accosiated thoughts?
                const test = await Thought.deleteMany({ _id: { $in: deleted.thoughts } })
                console.log(test)
                res.status(200).json({ msg: 'user deleted', deleted })
            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    // add friend
    async addFriend(req, res) {
        try {
        const updated = await User.findOneAndUpdate(
            { _id: req.params.user_id },
            { $addToSet: { friends: req.params.friend_id } }
            )
        res.status(200).json(updated)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    // remove friend
    async removeFriend(req, res) {
        try {
        const removed = await User.findByIdAndUpdate(
            { _id: req.params.user_id },
            { $pull: { friends: req.params.friend_id } }
        )
        res.status(200).json(removed)
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}