const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  }
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

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
  reactions: [ReactionSchema]
},
{
  toJSON: {
    getters: true
  },
  id: false
});


//reactionCount
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;