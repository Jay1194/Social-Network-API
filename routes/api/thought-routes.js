const router = require('express').Router();
const { addThought, removeThought, getAllThought, getThoughtById, removeReaction, addReaction } = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId').delete(removeThought);

// /api/thoughts
router.route('/').get(getAllThought);

// /api/thoughts/<thoughtId>
router.route('/:id').get(getThoughtById);

// add reaction 
router.route('/:userId/:thoughtId').post(addReaction)

// remove reaction
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;