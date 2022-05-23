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
                return res.status(404).json({ message: 'No user found with this ID'})
            }
            res.json(dbData)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
}
module.exports = userController