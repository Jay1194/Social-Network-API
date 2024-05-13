const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    min: [1, 'text can be no longer then 280 characters!' ],
    max: 280
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true

  }
  ///reactions

  //reactionCount

  //reactionId
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;