const { User, Thought } = require('../models');

module.exports = {
    getThought(req, res) {
        Thought.find()
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },

    getSingleThought({ params }, res) {
        Thought.findOne({ _id: params.id })
          .populate({path: 'reactions',select: '-__v'})
          .select('-__v')
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => { console.log(err); res.sendStatus(400);});
      },

      createThought(req, res) {
        Thought.create(req.body)
        .then(thoughtData => {
            User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughtData._id } },
                { new: true })
                .then((User) =>
                    !User
                        ? res.status(404).json({ message: 'No user found' })
                            : res.json(User))
                    .catch(err => res.json(err)); })
            .catch(err => res.status(400).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((thought) => 
            !thought ? res.status(404).json({message: 'No thought found !'}) : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.userId })
        .then((thought) =>
          !thought ? res.status(404).json({ message: 'No thought found' })
          : Thought.findOneAndUpdate({ users: req.params.userId },{ $pull: {users: req.params.userId } },{ new: true }))
        .then((thought) => 
        !thought ? res
        .status(404)
        .json({ message: 'Thought created cant find thought id' })
        : res.json({ message: 'Thought deleted!'}))
        .catch((err) => res.status(500).json(err));  
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },{ $addToSet: { reactions: req.body } },{ runValidators: true, new: true })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought found" })
              : res.json(thought))
          .catch((err) => res.status(500).json(err));
      },

      deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionId: params.reactionId } } }, { new: true })
          .then(userData => res.json(userData))
          .catch(err => res.json(err));}
    };
    
    