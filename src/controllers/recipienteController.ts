import { Request, Response } from "express";
import { criarRecipiente } from "../services/recipienteService";

export const criarRecipienteController = async (req: Request, res: Response): Promise<any> => {
  const usuarioId = (req as any).user.id;
  const { nome, volume_ml } = req.body;

  if (!nome || typeof nome !== "string") {
    return res.status(400).json({ message: "O nome do recipiente é obrigatório." });
  }

  if (!volume_ml || isNaN(volume_ml) || volume_ml <= 0) {
    return res.status(400).json({ message: "O volume informado deve ser um número válido." });
  }

  try {
    const novo = await criarRecipiente(usuarioId, nome, volume_ml);
    return res.status(201).json(novo);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message || "Erro ao criar recipiente." });
  }
};
