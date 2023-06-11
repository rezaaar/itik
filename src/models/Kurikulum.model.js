import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    kode: {
        type: String,
        unique: true,
        required: true
    },
    course: {
        type: String,
        required: true,
    },
    sks: {
        type: Number,
        required: true
    },
    hour: {
        type: Number,
        required: true
    }
})

const KurikulumModel = mongoose.model('Kurikulum', dataSchema)

export default KurikulumModel