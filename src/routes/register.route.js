import express from "express";
import { register, registerCliente } from "../controllers/register.controller.js";

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

/**
 * @swagger
 * /register/cliente:
 *   post:
 *     summary: Registra um novo cliente
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
 *                 description: Nome do cliente
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do cliente
 *               senha:
 *                 type: string
 *                 description: Senha do cliente
 *               telefone:
 *                 type: string
 *                 description: Telefone do cliente
 *     responses:
 *       201:
 *         description: Cliente registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do cliente registrado
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Erro ao registrar cliente
 */
router.post("/cliente", registerCliente);

export default router;
