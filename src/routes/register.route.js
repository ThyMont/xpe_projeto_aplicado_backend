import express from "express";
import { register } from "../controllers/register.controller.js";

const router = express.Router();
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Registro]
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
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *               telefone:
 *                 type: string
 *                 description: Telefone do usuário
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do usuário registrado
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Erro ao registrar usuário
 */
router.post("/", register);

export default router;
