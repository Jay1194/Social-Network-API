const { User, Thought } = require('../models');

module.exports = {
    getUsers(res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
        .then((user) =>
          !user ? res.status(404).json({ message: 'user not found' })
        : res.json(user)) .catch((err) => res.status(500).json(err));  
    },

    createUser(req, res) {
        User.create(req.body)
          .then((User) => res.json(User))
          .catch((err) => res.status(500).json(err));
      },

      deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : Thought.deleteMany({ _id: { $in: user.thoughts } }))
          .then(() => 
          res.json({ message: 'User deleted' }))
          .catch((err) => 
          res.status(500).json(err));
      },

      updateUser(req, res) {
        User.findOneAndUpdate(
        {_id: req.params.userId},
        {$set: req.body},
        {runValidators: true, new: true})
        .then((user) => !user ? res.status(404).json({message: 'No user with this id!'}) : res.json(user))
        .catch((err) => {console.log(err);
        res.status(500).json(err);})
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.id }, { $push: { friends: params.friendsId } },{ new: true })
          .then(userData => res.json(userData)) .catch(err => {console.log(err);
          res.sendStatus(400);});
      },

      removeFriend({ params }, res) {
        User.findOneAndUpdate(
        { _id: params.userId }, { $pull: {friends: params.friendId} }, {new: true })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }};
