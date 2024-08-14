import express from "express";
import {
    createManutencao,
    findAllManutencao,
    findManutencaoById,
    updateManutencao,
    deleteManutencao,
} from "../controllers/manutencao.controller.js";

const router = express.Router();

// Route to create a new manutencao
router.post("/", createManutencao);

// Route to get all manutencao records
router.get("/", findAllManutencao);

// Route to get a specific manutencao by ID
router.get("/:id", findManutencaoById);

// Route to update a specific manutencao by ID
router.put("/:id", updateManutencao);

// Route to delete a specific manutencao by ID
router.delete("/:id", deleteManutencao);

export default router;
