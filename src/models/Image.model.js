import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        data: Buffer,
        contentType: String
    }
    
})
const ImageModel = mongoose.model("Image", dataSchema);

export default ImageModel