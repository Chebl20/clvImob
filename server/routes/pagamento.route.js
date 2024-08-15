import express from 'express';
import {
    createPagamento,
    getAllPagamentos,
    getPagamentoById,
    deletePagamento,
    updatePagamento
} from '../controllers/pagamento.controller.js';
import {authMiddleware} from "../middlewares/auth.middlewares.js"


const router = express.Router();

// Rota para criar um novo pagamento
router.post('/',authMiddleware, createPagamento);

// Rota para obter todos os pagamentos
router.get('/',authMiddleware, getAllPagamentos);

// Rota para obter um pagamento por ID
router.get('/:id',authMiddleware, getPagamentoById);

// Rota para deletar um pagamento
router.delete('/:id', authMiddleware,deletePagamento);

// Rota para atualizar um pagamento
router.put('/:id',authMiddleware, updatePagamento);

export default router;
