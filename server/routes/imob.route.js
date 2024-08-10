import { Router } from "express";
import imobControll from "../controllers/imob.controller.js";
import {authMiddleware} from "../middlewares/auth.middlewares.js"


const {create,findAll} = imobControll;

const router = Router();

router.post("/",authMiddleware, create)
router.get("/",authMiddleware,findAll)

export default router;

