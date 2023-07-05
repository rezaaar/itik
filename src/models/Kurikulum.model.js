import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    kode: {
        type: String,
        required: true
    },
    mata_kuliah: {
        type: String,
        required: true,
    },
    semester: {
        type: Number,
        required: true
    },
    jam_teori: {
        type: Number,
        required: true
    },
    jam_praktikum: {
        type: Number,
        required: true
    },
    kredit_teori: {
        type: Number,
        required: true
    },
    kredit_praktikum: {
        type: Number,
        required: true
    },
    jam: {
        type: Number,
        required: true
    },
    kredit: {
        type: Number,
        required: true
    },
    prodi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prodi'
    }
})

const KurikulumModel = mongoose.model('Kurikulum', dataSchema)

export default KurikulumModel