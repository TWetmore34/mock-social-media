const router = require('express').Router()

const { 
    getUsers,
    getOneUser,
    createNewUser,
    updateUser,
    deleteUser
 } = require('../../controllers/userControllers')

router.route('/').get(getUsers).post(createNewUser)

router.route('/:user_id').get(getOneUser).put(updateUser).delete(deleteUser)

module.exports = router