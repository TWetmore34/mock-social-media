const router = require('express').Router()
const { 
    getThoughts
 } = require('../../controllers/thoughtControllers')

router.route('/').get(getThoughts)

module.exports = router