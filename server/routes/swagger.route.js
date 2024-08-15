import { Router } from "express";
const router = Router();

import swaggerUI from "swagger-ui-express";
import fs from 'fs';

// Certifique-se de que o caminho para o arquivo swagger.json está correto
const swaggerDocument = JSON.parse(fs.readFileSync(new URL('../swagger.json', import.meta.url), 'utf-8'));

router.use("/", swaggerUI.serve);
router.get("/", swaggerUI.setup(swaggerDocument));

export default router;
