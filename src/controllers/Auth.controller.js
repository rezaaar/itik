import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import Models from '../models/index.js'
const User = Models.User
const Role = Models.Role

const AuthController = {
    signup: async (req, res) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync("123", 8),
            // role: await Role.find({ name: { $in: req.body.role } }).then(
            //     (roles) => {
            //         return roles.map((role) => role._id)
            //     }
            // ),
            role: req.body.role,
            name: req.body.fullname
        })

        try {
            
            await newUser.save()
            res.status(200).json({ message: "User was registered successfully!" })
        }

        catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    signin: async (req, res) => {
        try {
            await User.findOne({
                username: req.body.username
            })
                .populate("role")
                .then((user) => {
                    if (!user) {
                        return res.status(404).send({ message: "User Not found." });
                    }

                    const passwordIsValid = bcrypt.compareSync(
                        req.body.password,
                        user.password
                    );

                    if (!passwordIsValid) {
                        return res.status(401).send({
                            accessToken: null,
                            message: "Invalid Password!"
                        });
                    }

                    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 })

                    res.status(200).json({
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        accessToken: token,
                        role: user.role.name
                    });
                })
                .catch((err) => {
                    res.status(500).json({ message: err });
                })
        } catch (error) {
            res.status(500).json({ message: error });
            return;
        }
    }
}

export default AuthController