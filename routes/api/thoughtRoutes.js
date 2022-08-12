const router = require('express').Router()
const { 
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    getReactions,
    updateReaction,
    deleteReaction
 } = require('../../controllers/thoughtControllers')

router.route('/').get(getThoughts).post(createThought)

router.route('/:thought_id').get(getOneThought).put(updateThought).delete(deleteThought)

router.route('/:thought_id/reaction').get(getReactions).post(createReaction)

router.route('/:thought_id/reaction/:reaction_id').put(updateReaction).delete(deleteReaction)

module.exports = router