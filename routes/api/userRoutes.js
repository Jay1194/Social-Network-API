const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');

router.route('/')
.post(createUser)
.get(getUsers);

router.route('/:id')
.put(updateUser)
.get(getUserById)
.delete(deleteUser);

router.route('/:id/friends/:friendsId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;