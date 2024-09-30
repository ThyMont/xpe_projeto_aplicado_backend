import express from "express";
import { editarCardapio } from "../controllers/cardapio.controller.js";

const router = express.Router();

router.put("/:restauranteId/:cardapioId", editarCardapio);

export default router;
