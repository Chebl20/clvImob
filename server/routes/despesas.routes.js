import express from 'express';
import { createDespesas, findAllDespesas, findDespesaById, updateDespesas, deleteDespesas } from '../controllers/despesas.controller.js';

const router = express.Router();

// Route to create a new despesas
router.post('/', createDespesas);

// Route to get all despesas with pagination
router.get('/', findAllDespesas);

// Route to get a specific despesa by ID
router.get('/:id', findDespesaById);

// Route to update a despesa by ID
router.put('/:id', updateDespesas);

// Route to delete a despesa by ID
router.delete('/:id', deleteDespesas);

export default router;
