import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    username: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },
    picture: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
    }
})

const UserModel = mongoose.model('User', dataSchema)

export default UserModel