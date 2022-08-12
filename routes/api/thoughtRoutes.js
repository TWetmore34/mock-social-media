const router = require('express').Router()
const { 
    getThoughts,
    getOneThought,
    createThought
 } = require('../../controllers/thoughtControllers')

router.route('/').get(getThoughts).post(createThought)

router.route('/:thought_id').get(getOneThought)

module.exports = router