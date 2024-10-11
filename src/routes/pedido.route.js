import express from "express";
import { createPedido, listarPedidos, detalharPedido } from "../controllers/pedido.controller.js";
import authClienteMiddleware from "../middlewares/authClienteMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /pedido:
 *   post:
 *     summary: Cria um novo pedido com pagamento
 *     tags: [Pedido]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     item_id:
 *                       type: integer
 *                       description: ID do item do pedido
 *                     quantidade:
 *                       type: integer
 *                       description: Quantidade do item
 *               metodo_pagamento:
 *                 type: string
 *                 description: Método de pagamento utilizado
 *             required:
 *               - items
 *               - metodo_pagamento
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Erro na validação dos dados
 *       401:
 *         description: Usuário não autorizado
 *       500:
 *         description: Erro ao criar pedido
 */

router.post("/", authClienteMiddleware, createPedido); // Usando authClienteMiddleware

/**
 * @swagger
 * /pedido:
 *   get:
 *     summary: Lista todos os pedidos do cliente
 *     tags: [Pedido]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do pedido
 *                   cliente_id:
 *                     type: integer
 *                     description: ID do cliente que fez o pedido
 *                   status:
 *                     type: string
 *                     description: Status do pedido
 *                   criado_em:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Usuário não autorizado
 */

router.get("/", authClienteMiddleware, listarPedidos); // Usando authClienteMiddleware

/**
 * @swagger
 * /pedido/{id}:
 *   get:
 *     summary: Detalha um pedido específico
 *     tags: [Pedido]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido a ser detalhado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do pedido
 *                 cliente_id:
 *                   type: integer
 *                   description: ID do cliente que fez o pedido
 *                 status:
 *                   type: string
 *                   description: Status do pedido
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       item_id:
 *                         type: integer
 *                         description: ID do item do pedido
 *                       quantidade:
 *                         type: integer
 *                         description: Quantidade do item
 *       404:
 *         description: Pedido não encontrado
 *       401:
 *         description: Usuário não autorizado
 */

router.get("/:id", authClienteMiddleware, detalharPedido); // Usando authClienteMiddleware

export default router;
