import Models from "../models/index.js";

const Lab = Models.Lab
const Dosen = Models.Dosen

const LabController = {
    getAll: async (req, res) => {
        try {
            const data = await Lab.find().populate('leader')
            res.status(200).json(data)
        }

        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    getOne: async (req, res) => {
        try {
            const data = await Lab.findById(req.params.id).populate('leader')
            
            res.status(200).json(data)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    post: async (req, res) => {
        const data = new Lab({
            name: req.body.name,
            description: req.body.description,
            leader: await Dosen.find({ _id: { $in: req.body.leader } }).then((dosen) => {
                return dosen.map((dosen) => dosen._id)
            }),
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
            const data = await Lab.findById(req.params.id)
            data.name = req.body.name
            data.description = req.body.description
            data.leader = await Dosen.find({ name: { $in: req.body.dosen } }).then((dosen) => {
                return dosen.map((dosen) => dosen._id)
            })
            const newData = await data.save()
            res.status(200).json(newData)
        }

        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

export default LabController