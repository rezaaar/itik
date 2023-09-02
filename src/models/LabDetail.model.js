import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    lab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lab'
    },

    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },

    
    
})
const LabDetailModel = mongoose.model("LabDetail", dataSchema);

export default LabDetailModel