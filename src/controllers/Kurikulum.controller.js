import Models from "../models/index.js";
import mongoose, { isValidObjectId } from "mongoose";


const Kurikulum = Models.Kurikulum

const KurikulumController = {
    getAll: async(req, res) => {
        try {
            const data = await Kurikulum.find().populate('prodi', 'name')
            res.status(200).json(data)
        } catch (error) {
            res.status(400).kson({message: error})
        }
    },

    getProdiKurikulum: async(req, res) => {
        try {
            const prodi = req.query.prodi
            const data = await Kurikulum.find({prodi: prodi}).populate('prodi', 'name')
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({message: error})
        }
    },

    getEachSemester: async(req, res) => {
        try {
            const semester = req.query.semester
            const data = await Kurikulum.find({semester: semester}).populate('prodi', 'name')
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({message: error})
        }
    },
    getDetail: async(req,res) => {
        try {
            const prodi = req.query.prodi
            const semester = req.query.semester
            const data = await Kurikulum.find({prodi: prodi, semester: semester}).populate('prodi', 'name')
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({message: error})
        }
    }
}

export default KurikulumController