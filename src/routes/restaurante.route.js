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

export default router;
