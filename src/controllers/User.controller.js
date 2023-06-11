import Models from "../models/index.js"

const User = Models.User

const UserController = {
    allAccess: (req, res) => {
        res.status(200).json("Public")
    },
    mahasiswaAccess: (req, res) => {
        res.status(200).json("Mahasiswa")
    },
    dosenAccess: (req, res) => {
        res.status(200).json("Dosen")
    },
    adminAccess: (req, res) => {
        res.status(200).json("Admin")
    },
    getAll: async (req, res) => {
        try {
            const data = await User.find().populate("role")
            
            res.status(200).json(data)
        }

        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    getOne: async (req, res) => {
        try {
            const data = await User.findById(req.params.id).populate("role")
            res.status(200).json(data)
        }

        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    update: async (req, res) => {
        try {
            const data = await User.findById(req.params.id)
            data.username = req.body.username
            data.email = req.body.email
            const roles = await Models.Role.find({ name: { $in: req.body.roles } })
            data.roles = roles.map(role => role._id)
            const newData = await data.save()
            res.status(200).json(newData)
        }

        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const data = await User.findById(req.params.id)
            const newData = await data.remove()
            res.status(200).json(newData)
        }

        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

export default UserController