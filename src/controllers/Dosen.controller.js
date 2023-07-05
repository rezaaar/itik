import Models from "../models/index.js";

const Dosen = Models.Dosen
const RG = Models.ResearchGroup

const DosenController = {
    getAll: async (req, res) => {
        try {
            const data = await Dosen.find().populate('research_group')
            res.status(200).json(data)

        } catch (error) {
            res.status(400).json({message: error})
        }
    },

    post: async(req, res) => {
        const data = new Dosen({
            nip : req.body.nip,
            name: req.body.name,
            email: req.body.email,
            research_group: await RG.find({_id: {$in: req.body.research_group}}).then(
                (rg) => {
                    return rg.map((rg) => rg._id)
                }
            )
        })

        try {
            const newData = await data.save()
            res.status(200).json(newData)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
}

export default DosenController