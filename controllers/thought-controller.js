const res = require('express/lib/response')
const { Thought, User } = require('../models')

const thoughtController = {
    getThoughts(req, res) {
        Thought.find()
        .then((dbData) => {
            res.json(dbData)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
    getThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((dbData) => {
            if(!dbData) {
                return res.status(404).json({ message: 'No thought found with this ID'})
            }
            res.json(dbData)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
    createThought(req, res) {
        Thought.create(req.body)
        .then((dbData) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbData._id }},
                { new: true }
            )
        })
        .then((dbData) => {
        if (!dbData) {
            return res.status(404).json
        }
        res.json({ message: 'Though created!' })
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
}

module.exports = thoughtController