const router = require('express').Router()

const { 
    getUsers,
    getOneUser
 } = require('../../controllers/userControllers')

 router.route('/').get(getUsers)

router.route('/:id').get(getOneUser)

 module.exports = router