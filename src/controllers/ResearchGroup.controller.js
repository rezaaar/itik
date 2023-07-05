import Models from "../models/index.js";
const Dosen = Models.Dosen
const ResearchGroup = Models.ResearchGroup

const ResearchGroupController = {
    getAll: async (req, res) => {
        try {
            const data = await ResearchGroup.find()
            res.status(200).json(data)
        }

        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    getOne: async (req, res) => {
        try {
            const data = await ResearchGroup.findById(req.params.id)
            const response = {
                _id: data._id,
                name: data.name,
                description: data.description,
                members: [],
                // leader: data.leader
            }
            
            await Dosen.find({research_group: data._id}).then(
                (dosen) => {
                    // return dosen.map((dosen) => dosen._id)
                    dosen.map((dosen) => {
                        // if(dosen.name != data.leader.name) {
                        //     response.members.push(dosen.name)
                        // }
                        response.members.push({
                            name: dosen.name,
                            nip: dosen.nip
                        })
                    })
                }
            ).catch(
                (error) => {
            res.status(400).json({ message: error.message })
                }
            )
            res.status(200).json(response)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    post: async (req, res) => {
        const data = new ResearchGroup({
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
            const data = await ResearchGroup.findById(req.params.id)
            data.name = req.body.name
            data.description = req.body.description
            // data.leader = await Dosen.find({ name: { $in: req.body.dosen } }).then((dosen) => {
            //     return dosen.map((dosen) => dosen._id)
            // })
            const newData = await data.save()
            res.status(200).json(newData)
        }

        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

export default ResearchGroupController