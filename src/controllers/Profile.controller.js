import Models from "../models/index.js"

const User = Models.User

const ProfileController = {
    updateProfile: async (req, res) => {
        try {
            const data = await User.findById(req.params.id).populate("role")
            data.username = req.body.username
            data.email = req.body.email
            const roles = await Models.Role.find({ name: { $in: req.body.roles } })
            data.roles = roles.map(role => role._id)
            if(req.file) {
                let imageUploadObject = {
                    file: {
                      data: req.file.buffer,
                      contentType: req.file.mimetype
                    },
                    fileName: "asdasd"
                  };
                //   const uploadObject = new User(imageUploadObject);
                  // saving the object into the database
                  data.picture = imageUploadObject
            }
            const newData = await data.save()
            res.status(200).json(newData)
        } catch (error) {
            
        }
    },

    getProfile: async(req, res) => {
        try {
            const data = await User.findById(req.params.id).populate("role")
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    
    delete: async (req, res) => {
        try {
            const data = await User.findById(req.params.id)
            const newData = await data.remove()
            res.status(200).json(newData)
        }

        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

export default ProfileController