const router = require('express').Router();

const {
    getThought,
    createThought,
    getSingleThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController.js');

router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

    router.route('/:thoughtId/reactions').post(createReaction)
    router.route('/').get(getThought).post(createThought);
    router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

module.exports = router;