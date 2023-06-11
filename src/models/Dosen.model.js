import mongoose from "mongoose";
// Declare the Schema of the Mongo model
var dataSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
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
        required: true,
    },
    lab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lab"
    }
});


const DosenModel = mongoose.model('Dosen', dataSchema)

export default DosenModel