import express from "express";
import { atualizarMetaController, getMetaAtivaController } from "../controllers/metaController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /api/meta:
 *   put:
 *     summary: Atualiza a meta diária de ingestão de água
 *     tags: [Meta]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantidade_ml:
 *                 type: integer
 *                 example: 2500
 *     responses:
 *       200:
 *         description: Meta atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 novaMeta:
 *                   $ref: '#/components/schemas/Meta'
 *       400:
 *         description: Quantidade inválida
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */
router.put("/", authMiddleware, atualizarMetaController);

/**
 * @swagger
 * /api/meta/ativa:
 *   get:
 *     summary: Retorna a meta de hidratação ativa do usuário
 *     tags: [Meta]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Meta ativa do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meta'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Nenhuma meta ativa encontrada
 *       500:
 *         description: Erro interno
 */
router.get("/ativa", authMiddleware, getMetaAtivaController);

export default router;
