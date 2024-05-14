const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller')

//Set up GET all and Post at /api/users
router.route('/')
.get(getAllUser)
.post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

  // addfriend 
router.route('/:userId/:friendId').post(addFriend);

// remove friend
router.route('/:userId/:friendId').delete(deleteFriend);


module.exports = router;