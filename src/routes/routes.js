import express from "express";
import Controller from "../controllers/index.js";

 
const router = express.Router()

router.get('/menu', Controller.Menu.getAll)
router.post('/menu', Controller.Menu.post)



export default router