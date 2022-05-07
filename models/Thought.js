const { Schema, model } = require('mongoose')
const moment = require('moment')
const reactionsSchema = require('./Reaction.js')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,

    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: moment().format('LLL')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionsSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
})

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema)

module.exports = Thought