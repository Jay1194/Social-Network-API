const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    min: [1, 'text can be no longer then 280 characters!' ],
    max: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)
  },
  username: {
    type: String,
    required: true

  },
  ///reactions

  //reactionCount

  //reactionId
},
{
  toJSON: {
    getters: true
  },
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;