import mongoose from "mongoose";
// Declare the Schema of the Mongo model
var dataSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        // unique:true,
    },
    email:{
        type:String,
        // required:true,
        // unique:true,
    },
    picture: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    nip: {
        type: String,
        // required: true,
    },
    research_group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResearchGroup"
    }
});


const DosenModel = mongoose.model('Dosen', dataSchema)

export default DosenModel