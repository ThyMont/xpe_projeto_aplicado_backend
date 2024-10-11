import express from "express";
import {
  createCategoria,
  updateCategoria,
  deleteCategoria,
  getCategoria,
} from "../controllers/categoriaCardapio.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createCategoria);

router.get("/:id", getCategoria);

router.put("/:id", authMiddleware, updateCategoria);

router.delete("/:id", authMiddleware, deleteCategoria);

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Gerenciamento de categorias do cardápio
 */

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Criar uma nova categoria
 *     tags: [Categorias]
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
 *                 description: Nome da categoria
 *               cardapioId:
 *                 type: integer
 *                 description: ID do cardápio ao qual a categoria pertence
 *             required:
 *               - nome
 *               - cardapioId
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       400:
 *         description: Erro na validação dos dados
 *       401:
 *         description: Usuário não autorizado
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Listar todas as categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias
 *       401:
 *         description: Usuário não autorizado
 */

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Atualizar uma categoria existente
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da categoria a ser atualizada
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
 *                 description: Novo nome da categoria
 *             required:
 *               - nome
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       400:
 *         description: Erro na validação dos dados
 *       404:
 *         description: Categoria não encontrada
 *       401:
 *         description: Usuário não autorizado
 */

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Deletar uma categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da categoria a ser deletada
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Categoria deletada com sucesso
 *       404:
 *         description: Categoria não encontrada
 *       401:
 *         description: Usuário não autorizado
 */

export default router;
