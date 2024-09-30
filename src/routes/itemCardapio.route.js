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

router.get("/", authMiddleware, listarItens);

router.get("/:id", authMiddleware, getItemById);

router.put("/:id", authMiddleware, updateItem);

router.delete("/:id", authMiddleware, deleteItem);

export default router;
