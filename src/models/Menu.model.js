import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    full_title: {
        required: true,
        type: String
    },
    menu_title: {
        type: String,
        required: true
    },
    description: {
        required: true,
        type: String
    },
    icon: {
        required: true,
        type: String
    },
    url: {
        required: true,
        type: String
    }
})

const MenuModel = mongoose.model('Menu', dataSchema)

export default MenuModel