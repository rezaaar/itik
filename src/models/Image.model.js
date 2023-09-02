import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image_id: {
        type: String
    },
    mimeType: {
        type: String
    }
    
})
const ImageModel = mongoose.model("Image", dataSchema);

export default ImageModel