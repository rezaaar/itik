import Models from "../models/index.js";
const Dosen = Models.Dosen;
const ResearchGroup = Models.ResearchGroup;
const Research = Models.Research;

const ResearchController = {

    getAll: async (req, res) => {
        try{
            const researchs = await Research.find().populate("research_group", "name")
            res.status(200).json(researchs)
        } catch (error) {
            res.status(400).json({ message: error.message });
        } 
    },

    getByRG: async(req,res) => {
        try {
            const data = await Research.find({research_group: req.params.rgid}).populate("research_group", "name")
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },

    getOne: async (req, res) => {
        try {
            const data = await Research.findById(req.params.id);
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    post: async (req, res) => {
        const data = new Research({
            title: req.body.title,
            // file: req.file.file,
            year: req.body.year,
            scopussource : req.body.scopussource,
            research_group: await ResearchGroup.find({ _id: req.body.research_group }).then((researchgroup) => {
                return researchgroup.map((researchgroup) => researchgroup._id)
            }),
            abstract: req.body.abstract,
            doi: req.body.doi
        });

        try {
            const newData = await data.save();
            res.status(200).json(newData);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const data = await Research.findById(req.params.id);
            data.title = req.body.title;
            // data.file = req.body.file;
            data.year = req.body.year;
            data.scopussource  = req.body.scopussource;
            const newData = await data.save();
            res.status(200).json(newData);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};

export default ResearchController;