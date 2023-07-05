import mongoose from "mongoose";
// Declare the Schema of the Mongo model
var dataSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        // unique:true,
    },
    nrp:{
        type:String,
        // required:true,
        // unique:true,
    },
    prodi: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    prestasi: {
        type: String,
        // required: true,
    },
    jenis: {
        type: String,
        // required: true,
    },
    penyelenggara: {
        type: String,
        // required: true,
    },
    tingkat: {
        type: String,
        // required: true,
    },

});


const PrestasiModel = mongoose.model('Prestasi', dataSchema)

export default PrestasiModel