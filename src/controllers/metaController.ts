import { Request, Response } from "express";
import { atualizarMeta } from "../services/metaService";

export const atualizarMetaController = async (req: Request, res: Response): Promise<any> => {
  const usuarioId = (req as any).user.id;
  const { quantidade_ml } = req.body;

  if (!quantidade_ml || isNaN(quantidade_ml)) {
    return res.status(400).json({ message: "Informe uma quantidade válida." });
  }

  try {
    const novaMeta = await atualizarMeta(usuarioId, quantidade_ml);
    return res.status(200).json({ message: "Meta atualizada com sucesso!", meta: novaMeta });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao atualizar meta." });
  }
};

import { getMetaAtiva } from "../services/metaService";

export const getMetaAtivaController = async (req: Request, res: Response): Promise<any> => {
  const usuarioId = (req as any).user.id;

  try {
    const meta = await getMetaAtiva(usuarioId);

    if (!meta) {
      return res.status(404).json({ message: "Nenhuma meta ativa encontrada." });
    }

    return res.status(200).json(meta);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao buscar meta ativa." });
  }
};
