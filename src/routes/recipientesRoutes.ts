import express from "express";
import { criarRecipienteController } from "../controllers/recipienteController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /api/recipientes:
 *   post:
 *     summary: Cria um novo recipiente personalizado para o usuário
 *     tags: [Recipientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Garrafa
 *               volume_ml:
 *                 type: integer
 *                 example: 500
 *     responses:
 *       201:
 *         description: Recipiente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipiente'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */
router.post("/", authMiddleware, criarRecipienteController);

export default router;
