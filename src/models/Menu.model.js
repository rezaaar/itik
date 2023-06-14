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
        type: String,
        default: "fa_cloud"
    },
    url: {
        type: String,
        required: true,
    }
})

const MenuModel = mongoose.model('Menu', dataSchema)

export default MenuModel