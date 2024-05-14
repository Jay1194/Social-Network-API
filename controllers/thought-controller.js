const { User, Thought } = require('../models');
const { Types } = require('mongoose');

const thoughtController = {
  //Get all thoughts
  getAllThought(req, res) {
    Thought.find({})
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
 },
 // Get a thought by id
 getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .then(dbThoughtData => {
        // If not Thought is found, send 404
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!'
});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
 },
  // add thought to user
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
    },
    //add reaction
    addReaction({ params, body }, res) {
      const { thoughtId } = params;
      const newReaction = {
        reactionId: new Types.ObjectId()
      };
      Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $push: { reactions: newReaction } },
        { new: true }
      )
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    // remove reaction
    removeReaction({ params }, res) {
      const { thoughtId, reactionId } = params;
      Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { _id: reactionId } } },
        { new: true }
      )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

  // remove Thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
}
module.exports = thoughtController;