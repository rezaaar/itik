import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    }
})

const RoleModel = mongoose.model('Role', dataSchema)

export default RoleModel