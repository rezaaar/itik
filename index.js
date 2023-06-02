import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const mongoString = process.env.DB_URL
mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


import router from "./src/routes/routes.js";

const app = express()

const corsOptions = {
    origin: "*"
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api', router)

app.listen(3030, () => {
    console.log("Server is running on port 3030")
})
