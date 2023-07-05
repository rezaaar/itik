import Models from "../models/index.js";
import multer from "multer";


const Image = Models.Image

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({storage: storage})

const ImageController = {
    upload: async(req,res) => {
        try {
            upload.single('image')            
        } catch (error) {
            
        }
    },

    getAll: async(req,res) => {
        try {
            const data = await Image.find()
            res.status(200).json(data.render('imagepage', {items: data}))
        } catch (error) {
            res.status(400).json({message: error})
        }
    }
}

export default ImageController
