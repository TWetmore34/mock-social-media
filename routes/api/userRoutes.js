const router = require('express').Router()

const { 
    getUsers,
    getOneUser,
    createNewUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
 } = require('../../controllers/userControllers')

router.route('/').get(getUsers).post(createNewUser)

router.route('/:user_id').get(getOneUser).put(updateUser).delete(deleteUser)

router.route('/:user_id/friends/:friend_id').post(addFriend).delete(removeFriend)

module.exports = router