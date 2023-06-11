import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        type: String,
        requuired: true,
    },
    visi: {
        type: Object,
        required: true
    },
    misi: {
        type: Object,
        required: true
    },

})

const ProdiModel = mongoose.model('Prodi', dataSchema)

export default ProdiModel