import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    file: {
        type: String
    },
    year: {
        type: String
    },
    scopussource : {
        type : String
    },
    research_group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResearchGroup"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    abstract: {
        type: String
    },
    doi: {
        type: String
    }

})

const ResearchModel = mongoose.model("Research", dataSchema);

export default ResearchModel
