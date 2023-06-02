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
    post: async (req, res) => {
        const data = new Menu({
            title: req.body.title,
            route: req.body.route
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
            data.title = req.body.title
            data.route = req.body.route
            const newData = await data.save()
            res.status(200).json(newData)
        }

        catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    delete: async (req, res) => {
        try {
            const data = await Menu.findById(req.params.id)
            const newData = await data.remove()
            res.status(200).json(newData)
        }

        catch (error) {
            res.status(400).json({message: error.message})
        }
    }
}

export default MenuController