import express from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getProfile);

router.put("/", authMiddleware, updateProfile);
/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Obtém as informações do perfil do usuário logado
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informações do perfil do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do usuário
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *                 telefone:
 *                   type: string
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Atualiza as informações do perfil do usuário logado
 *     tags: [Profile]
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
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *               telefone:
 *                 type: string
 *                 description: Telefone do usuário
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar perfil
 *       401:
 *         description: Não autorizado
 */
export default router;
