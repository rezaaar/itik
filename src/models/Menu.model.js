import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    route: {
        required: true,
        type: String
    }
})

const MenuModel = mongoose.model('Menu', dataSchema)

export default MenuModel