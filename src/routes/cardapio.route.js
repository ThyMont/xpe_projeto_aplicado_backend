import express from "express";
import { editarCardapio, listCategorias } from "../controllers/cardapio.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put("/:cardapioId", authMiddleware, editarCardapio);
router.get("/:cardapioId", authMiddleware, listCategorias);

/**
 * @swagger
 * /cardapio/{cardapioId}:
 *   put:
 *     summary: Edita um cardápio
 *     tags: [Cardápio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cardapioId
 *         required: true
 *         description: ID do cardápio a ser editado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cardápio editado com sucesso
 *       400:
 *         description: Erro ao editar cardápio
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Cardápio não encontrado
 */

/**
 * @swagger
 * /cardapio/{cardapioId}:
 *   get:
 *     summary: Lista as categorias do cardápio
 *     tags: [Cardápio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cardapioId
 *         required: true
 *         description: ID do cardápio
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de categorias do cardápio
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Cardápio não encontrado
 */

export default router;
