import express from "express";
import {
  getConsumoHojeController,
  getHistoricoController,
  registrarConsumoController,
} from "../controllers/consumoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /api/consumo:
 *   post:
 *     summary: Registra um novo consumo usando o recipiente mais recente do usuário
 *     tags: [Consumo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Consumo registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 registro:
 *                   $ref: '#/components/schemas/RegistroAgua'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */

router.post("/", authMiddleware, registrarConsumoController);

/**
 * @swagger
 * /api/consumo/hoje:
 *   get:
 *     summary: Retorna o total consumido hoje e os registros do dia
 *     tags: [Consumo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista dos registros de hoje e total
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalConsumido:
 *                   type: integer
 *                 registros:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RegistroAgua'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao buscar consumo
 */
router.get("/hoje", authMiddleware, getConsumoHojeController);

/**
 * @swagger
 * /api/consumo/historico:
 *   get:
 *     summary: Retorna o histórico dos últimos 8 dias de consumo (incluindo hoje)
 *     description: Lista o total consumido por dia, incluindo o dia atual e os 7 dias anteriores. Dias sem consumo terão valor 0.
 *     tags: [Consumo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Histórico de consumo diário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: string
 *                     format: date
 *                     example: 2025-04-09
 *                   quantidade_ml:
 *                     type: integer
 *                     example: 1500
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao buscar histórico
 */

router.get("/historico", authMiddleware, getHistoricoController);

export default router;
