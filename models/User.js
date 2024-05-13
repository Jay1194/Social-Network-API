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
    }
    /*thoughts: {
        //
    },
    friends: {
        //
    },*/
    // Create virtuals
});

const User = model('User', UserSchema);

module.exports = User;