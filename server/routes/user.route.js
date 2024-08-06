import { Router } from 'express';
import userController from '../controllers/user.controller.js'; // Corrigir o caminho se necessário

const route = Router();

route.post("/", userController.create);


export default route;
