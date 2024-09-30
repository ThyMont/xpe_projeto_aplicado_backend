import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createRestaurante,
  listarRestarantes,
  updateRestaurante,
  apagarRestaurante,
  detalharRestaurante,
} from "../resources/restaurante.resource.js";

const router = express.Router();

router.get("/", authMiddleware, listarRestarantes);
router.put("/:id", authMiddleware, updateRestaurante);
router.post("/", authMiddleware, createRestaurante);
router.delete("/", authMiddleware, apagarRestaurante);
router.get("/:id", authMiddleware, detalharRestaurante);

export default router;
