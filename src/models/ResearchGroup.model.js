import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        type: String,
        required: true
    },
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dosen'
    },
})
const ResearchGroupModel = mongoose.model("ResearchGroup", dataSchema);

export default ResearchGroupModel