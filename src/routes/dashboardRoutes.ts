import express from "express";
import { getDashboardController } from "../controllers/dashboardController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Retorna dados resumidos para o painel do usuário
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informações de meta, consumo e recipiente padrão
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meta_diaria:
 *                   type: integer
 *                   example: 2500
 *                 consumo_hoje:
 *                   type: integer
 *                   example: 1800
 *                 progresso_percentual:
 *                   type: integer
 *                   example: 72
 *                 recipiente_padrao:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                     volume_ml:
 *                       type: integer
 *                     usuario_id:
 *                       type: integer
 *                     criado_em:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao buscar dados do painel
 */
router.get("/", authMiddleware, getDashboardController);

export default router;
