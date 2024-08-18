import { Router } from 'express';
import {create, findAll, findId, UpdateId} from '../controllers/user.controller.js';
import middlewares from '../middlewares/global.middlewares.js'; // Importa como objeto
import {authMiddleware} from "../middlewares/auth.middlewares.js"

const route = Router();

// /user
route.post("/", create);
route.get("/", findAll);
route.get("/cookie",authMiddleware,findId)
route.get("/:id", authMiddleware, findId);
route.patch("/:id", authMiddleware, UpdateId);

export default route;
