import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    },
})

const ContentModel = mongoose.model('Content', dataSchema)

export default ContentModel