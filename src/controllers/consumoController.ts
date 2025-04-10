import { Request, Response } from "express";
import { getConsumoHoje, getHistorico7Dias, registrarConsumo } from "../services/consumoService";

export const registrarConsumoController = async (req: Request, res: Response): Promise<any> => {
  const usuarioId = (req as any).user.id;
  const { quantidade_ml } = req.body;

  if (!quantidade_ml || isNaN(quantidade_ml)) {
    return res.status(400).json({ message: "Informe uma quantidade válida." });
  }

  try {
    const registro = await registrarConsumo(usuarioId);
    return res.status(201).json({ message: "Registro salvo com sucesso!", registro });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao registrar consumo." });
  }
};

export const getConsumoHojeController = async (req: Request, res: Response): Promise<any> => {
  const usuarioId = (req as any).user.id;

  try {
    const { totalConsumido, registros } = await getConsumoHoje(usuarioId);
    return res.status(200).json({ totalConsumido, registros });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao buscar consumo de hoje." });
  }
};

export const getHistoricoController = async (req: Request, res: Response): Promise<any> => {
  const usuarioId = (req as any).user.id;

  try {
    const historico = await getHistorico7Dias(usuarioId);
    return res.status(200).json(historico);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao buscar histórico." });
  }
};
