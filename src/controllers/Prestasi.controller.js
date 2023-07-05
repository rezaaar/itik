import Models from "../models/index.js"

const Prestasi = Models.Prestasi

const PrestasiController = {
    getAll: async (req, res) => {
        try {
            const {limit, page} = req.query
            const total = await Prestasi.count()
            const totalPage = Math.ceil(total/limit)
            const data = await Prestasi.find().skip(page? (page-1)*10 : 0).limit(limit? limit: 10)
            res.status(200).json({data: data, currentPage: +page, total: total, totalPage: totalPage})
        }

        catch (error) {
            res.status(400).json({message: error.message})
        }
    },

    getStatistic: async (req,res) => {
        try {
            const nasional = await Prestasi.find({tingkat: 'Nasional'}).count()
            const regional = await Prestasi.find({tingkat: 'Regional'}).count()
            const internasional = await Prestasi.find({tingkat: 'Internasional'}).count()
            const total = await Prestasi.count()

            res.status(200).json({
                total: total,
                nasional: nasional,
                regional: regional,
                internasional: internasional
            })
            
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    getOne: async (req, res) => {
        try {
            const data = await Prestasi.findById(req.params.id)
            res.status(200).json(data)
        }

        catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    post: async (req, res) => {
        const data = new Prestasi({
            nama: req.body.nama,
            nrp: req.body.nrp,
            prodi: req.body.prodi,
            prestasi: req.body.prestasi,
            jenis: req.body.jenis,
            penyelenggara: req.body.penyelenggara,
            tingkat: req.body.tingkat,
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
            const data = await Prestasi.findById(req.params.id)

            data.nama= req.body.nama
            data.nrp= req.body.nrp
            data.prodi= req.body.prodi
            data.prestasi= req.body.prestasi
            data.jenis= req.body.jenis
            data.penyelenggara= req.body.penyelenggara
            data.tingkat= req.body.tingkat
            
            const newData = await data.save()
            res.status(200).json(newData)
        }

        catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    delete: async (req, res) => {
        try {
            await Prestasi.deleteOne({_id: req.params.id})
            res.status(200).json({message: "delete success"})
        }

        catch (error) {
            res.status(400).json({message: error.message})
        }
    },


}

export default PrestasiController