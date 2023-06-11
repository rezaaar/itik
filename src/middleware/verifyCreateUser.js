import Models from '../models/index.js'
const User = Models.User

const verifyCreateUser = {
    checkDuplicateUsernameOrEmail: async (req, res, next) => {
        //check username
        try {
            await User.findOne({
                username: req.body.username
            }).then(async (user) => {
                if (user) {
                    res.status(400).json({ message: "Failed! Username is already in use!" })
                    return
                }

                await User.findOne({
                    email: req.body.email
                }).then((user) => {
                    if (user) {
                        res.status(400).json({ message: "Failed! Email is already in use!" })
                        return
                    }
                    next()
                }).catch((err) => {
                    res.status(500).json({message: err})
                })
            }).catch((err) => {
                res.status(500).json({message: err})
            })
        } catch (error) {
            res.status(500).json({message: err})
            return
        }
    }
}

export default verifyCreateUser