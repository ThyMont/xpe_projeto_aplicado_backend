import { Request, Response } from "express";
import { getPainelResumo } from "../services/dashboardService";

export const getDashboardController = async (req: Request, res: Response): Promise<any> => {
  const usuarioId = (req as any).user.id;

  try {
    const resumo = await getPainelResumo(usuarioId);
    return res.status(200).json(resumo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao carregar painel do usuário." });
  }
};
