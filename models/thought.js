const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId(),
        reactionBody: {type: String,required: true,maxlength: 280},
        createdAt: {type: Date,default: Date.now},
        username: {type: String,required: true}
    },
        toJSON: {
            getters: true,
        } 
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        default: Date.now,
        type: Date,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    reactions: [reactionSchema]
    },
    {
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;