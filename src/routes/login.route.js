import express from "express";
import { login, loginCliente } from "../controllers/login.controller.js";

const router = express.Router();
/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Faz login de um usuário existente
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticação do usuário
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/", login);

/**
 * @swagger
 * /auth/cliente:
 *   post:
 *     summary: Faz login de um cliente existente
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do cliente
 *               senha:
 *                 type: string
 *                 description: Senha do cliente
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticação do cliente
 *                 cliente:
 *                   type: object
 *                   description: Informações do cliente
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/cliente", loginCliente);

export default router;
