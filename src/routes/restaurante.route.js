import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createRestaurante,
  listarRestarantes,
  updateRestaurante,
  detalharRestaurante,
} from "../controllers/restaurante.controller.js";

const router = express.Router();

router.get("/", authMiddleware, listarRestarantes);
router.put("/:id", authMiddleware, updateRestaurante);
router.post("/", authMiddleware, createRestaurante);
router.get("/:id", authMiddleware, detalharRestaurante);

/**
 * @swagger
 * /restaurante:
 *   get:
 *     summary: Lista todos os restaurantes
 *     tags: [Restaurante]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de restaurantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do restaurante
 *                   nome:
 *                     type: string
 *                   email:
 *                     type: string
 *                   telefone:
 *                     type: string
 *                   endereco:
 *                     type: string
 *                   horario_funcionamento:
 *                     type: string
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /restaurante:
 *   post:
 *     summary: Cria um novo restaurante
 *     tags: [Restaurante]
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
 *                 description: Nome do restaurante
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do restaurante
 *               telefone:
 *                 type: string
 *                 description: Telefone do restaurante
 *               endereco:
 *                 type: string
 *                 description: Endereço do restaurante
 *               horario_funcionamento:
 *                 type: string
 *                 description: Horário de funcionamento do restaurante
 *               slug:
 *                 type: string
 *                 description: Identificador acessível pelo cliente
 *     responses:
 *       201:
 *         description: Restaurante criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do restaurante criado
 *                 nome:
 *                   type: string
 *       400:
 *         description: Erro ao criar restaurante
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /restaurante/{id}:
 *   put:
 *     summary: Atualiza um restaurante existente
 *     tags: [Restaurante]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do restaurante a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do restaurante
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do restaurante
 *               telefone:
 *                 type: string
 *                 description: Telefone do restaurante
 *               endereco:
 *                 type: string
 *                 description: Endereço do restaurante
 *               horario_funcionamento:
 *                 type: string
 *                 description: Horário de funcionamento do restaurante
 *               slug:
 *                 type: string
 *                 description: Identificador acessível pelo cliente
 *     responses:
 *       200:
 *         description: Restaurante atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar restaurante
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Restaurante não encontrado
 */

/**
 * @swagger
 * /restaurante/{id}:
 *   get:
 *     summary: Detalha um restaurante específico
 *     tags: [Restaurante]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do restaurante a ser detalhado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do restaurante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do restaurante
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *                 telefone:
 *                   type: string
 *                 endereco:
 *                   type: string
 *                 horario_funcionamento:
 *                   type: string
 *       404:
 *         description: Restaurante não encontrado
 *       401:
 *         description: Não autorizado
 */
export default router;
