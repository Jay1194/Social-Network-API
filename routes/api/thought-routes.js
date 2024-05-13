const router = require('express').Router();
const { addThought, removeThought, getAllThought, getThoughtById } = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId').delete(removeThought);

// /api/thoughts
router.route('/').get(getAllThought);

// /api/thoughts/<thoughtId>
router.route('/:id').get(getThoughtById);

module.exports = router;