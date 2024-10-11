import express from "express";
import {
  createItem,
  listarItens,
  getItemById,
  updateItem,
  deleteItem,
} from "../controllers/itemCardapio.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createItem);

router.get("/", listarItens);

router.get("/:id", getItemById);

router.put("/:id", authMiddleware, updateItem);

router.delete("/:id", authMiddleware, deleteItem);

/**
 * @swagger
 * tags:
 *   name: Itens do Cardápio
 *   description: Gerenciamento de itens do cardápio
 */

/**
 * @swagger
 * /itemCardapio:
 *   post:
 *     summary: Criar um novo item do cardápio
 *     tags: [Itens do Cardápio]
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
 *                 description: Nome do item
 *               preco:
 *                 type: number
 *                 format: float
 *                 description: Preço do item
 *               descricao:
 *                 type: string
 *                 description: Descrição do item
 *               categoriaId:
 *                 type: integer
 *                 description: ID da categoria ao qual o item pertence
 *               imagemUrl:
 *                 type: string
 *                 description: URL da imagem do item
 *             required:
 *               - nome
 *               - preco
 *               - categoriaId
 *               - imagemUrl
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 *       400:
 *         description: Erro na validação dos dados
 *       401:
 *         description: Usuário não autorizado
 */

/**
 * @swagger
 * /itemCardapio:
 *   get:
 *     summary: Listar todos os itens do cardápio
 *     tags: [Itens do Cardápio]
 *     responses:
 *       200:
 *         description: Lista de itens do cardápio
 *       401:
 *         description: Usuário não autorizado
 */

/**
 * @swagger
 * /itemCardapio/{id}:
 *   get:
 *     summary: Obter um item específico do cardápio
 *     tags: [Itens do Cardápio]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do item a ser obtido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item encontrado
 *       404:
 *         description: Item não encontrado
 */

/**
 * @swagger
 * /itemCardapio/{id}:
 *   put:
 *     summary: Atualizar um item existente do cardápio
 *     tags: [Itens do Cardápio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do item a ser atualizado
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
 *                 description: Novo nome do item
 *               preco:
 *                 type: number
 *                 format: float
 *                 description: Novo preço do item
 *               descricao:
 *                 type: string
 *                 description: Nova descrição do item
 *               imagemUrl:
 *                 type: string
 *                 description: Nova URL da imagem do item
 *             required:
 *               - nome
 *               - preco
 *               - imagemUrl
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *       400:
 *         description: Erro na validação dos dados
 *       404:
 *         description: Item não encontrado
 *       401:
 *         description: Usuário não autorizado
 */

/**
 * @swagger
 * /itemCardapio/{id}:
 *   delete:
 *     summary: Deletar um item do cardápio
 *     tags: [Itens do Cardápio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do item a ser deletado
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Item deletado com sucesso
 *       404:
 *         description: Item não encontrado
 *       401:
 *         description: Usuário não autorizado
 */

export default router;
