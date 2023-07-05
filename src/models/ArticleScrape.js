import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    publisher: {
        type: String,
    },
    image: {
        type: String
    },
    category: {
        required: true,
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const ArticleScrapeModel = mongoose.model('ArticleScrape', dataSchema)

export default ArticleScrapeModel