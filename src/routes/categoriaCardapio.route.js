import express from "express";
import {
  createCategoria,
  updateCategoria,
  listCategorias,
  deleteCategoria,
  getCategoria,
} from "../controllers/categoriaCardapio.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createCategoria);

router.put("/:id", authMiddleware, updateCategoria);

router.get("/cardapio/:cardapio_id", authMiddleware, listCategorias);

router.get("/:id", authMiddleware, getCategoria);

router.delete("/:id", authMiddleware, deleteCategoria);

export default router;
