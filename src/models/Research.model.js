import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    file: {
        type: String
    },
    lab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lab"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dosen",
        required: true
    },
    abstract: {
        type: String
    },
    doi: {
        type: String
    }

})
const ResearchModel = mongoose.model("Research", dataSchema);

export default ResearchModel;