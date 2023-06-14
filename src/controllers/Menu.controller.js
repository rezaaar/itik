import Models from "../models/index.js"

const Menu = Models.Menu

const MenuController = {
    getAll: async (req, res) => {
        try {
            const data = await Menu.find()
            res.status(200).json(data)
        }

        catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    getOne: async (req, res) => {
        try {
            const data = await Menu.findById(req.params.id)
            res.status(200).json(data)
        }

        catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    getMenuDetail: async (req, res) => {
        try {
            const data = await Menu.findOne({menu_title: req.params.title})
            res.status(200).json(data)
        }

        catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    post: async (req, res) => {
        const data = new Menu({
            full_title: req.body.full_title,
            menu_title: req.body.menu_title,
            description: req.body.description,
            url: req.body.menu_title
        })

        try {
            const newData = await data.save()
            res.status(200).json(newData)
        }

        catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    update: async (req, res) => {
        try {
            const data = await Menu.findById(req.params.id)
            data.full_title = req.body.full_title
            data.menu_title = req.body.menu_title
            data.description = req.body.description
            
            const newData = await data.save()
            res.status(200).json(newData)
        }

        catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    delete: async (req, res) => {
        try {
            await Menu.deleteOne({_id: req.params.id})
            res.status(200).json({message: "delete success"})
        }

        catch (error) {
            res.status(400).json({message: error.message})
        }
    },


}

export default MenuController