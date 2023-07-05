import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    lab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lab'
    },
    
})
const LabDetailModel = mongoose.model("LabDetail", dataSchema);

export default LabDetailModel