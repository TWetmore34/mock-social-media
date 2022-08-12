const router = require('express').Router()

const { 
    getUsers
 } = require('../../controllers/userControllers')

 router.route('/').get(getUsers)

 module.exports = router