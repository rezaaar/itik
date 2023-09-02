import Models from "../models/index.js";

const User = Models.User
const Article = Models.Article;


const ArticleController = {
    getAll: async (req, res) => {
        try {
            const {limit, page} = req.query
            const total = await Article.count()
            const totalPage = Math.ceil(total/limit)
            const data = await Article.find().skip(page? (page-1)*10 : 0).limit(limit? limit: 10)
            res.status(200).json({data: data, currentPage: +page, total: total, totalPage: totalPage})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const data = await Article.findById(req.params.id);
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getSomeArticle: async (req, res) => {
        try {
            const count = req.params.count
            const data = await Article.find().limit(count)
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({message: error})
        }
    },

    post: async (req, res) => {
        const data = new Article({
            title: req.body.title,
            description: req.body.description,
            publisher: await User.find({name: { $in: req.body.publisher } }).then((users) => {
                return users.map((user) => user._id)
            }),
            category: req.body.category
        });

        try {
            const newData = await data.save();
            res.status(200).json(newData);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const data = await Article.findById(req.params.id);
            data.title = req.body.title;
            data.content = req.body.content;
            const newData = await data.save();
            res.status(200).json(newData);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};

export default ArticleController;