const { Schema, model } = require('mongoose');
var validator = require('validator');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email address!`
        }
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
    },
    {
      toJSON: {
        virtuals: true
      },
      id: false
    }
  );

// get total count of friends and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });



const User = model('User', UserSchema);

module.exports = User;