import Models from "../models/index.js";

const Prodi = Models.Prodi

const ProdiController = {
    getAll: async (req, res) => {
        try {
            const data = await Prodi.find()
            res.status(200).json(data)
        }

        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    getList: async (req, res) => {
        try {
            const data = await Prodi.find({}, ['name', '_id'])
            res.status(200).json(data)
        }

        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    getOne: async (req, res) => {
        try {
            const data = await Prodi.findById(req.params.id)
            res.status(200).json(data)
        }

        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    post: async (req, res) => {
        const data = new Prodi({
            name: req.body.name,
            description: req.body.description,
        })

        try {
            const newData = await data.save()
            res.status(200).json(newData)
        }

        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    update: async (req, res) => {
        try {
            const data = await Prodi.findById(req.params.id)
            data.name = req.body.name
            data.description = req.body.description
            const newData = await data.save()
            res.status(200).json(newData)
        }

        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
}
export default ProdiController