const { Thought, User } = require('../models')

const userController = {
    getUsers(req, res) {
        User.find()
        .then((dbData) => {
            res.json(dbData)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
    getUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .populate('friends')
        .populate('thoughts')
        .then((dbData) => {
            if(!dbData) {
                return res.status(404).json({ message: 'No user found with this ID' })
            }
            res.json(dbData)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
    createUser(req, res) {
        User.create(req.body)
        .then((dbData) => {
            res.json(dbData)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runvalidators: true, new: true }
        )
        .then((dbData) => {
            if (!dbData) {
                return res.status(404).json
            }
            res.json(dbData)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((dbData) => {
            if(!dbData) {
                return res.status(404)
            }
            return Thought.deleteMany({ _id: { $in: dbData.thoughts } })
        })
        .then(() => {
            res.status(400).json({ message: 'User and thoughts deleted' })
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    }
}
module.exports = userController