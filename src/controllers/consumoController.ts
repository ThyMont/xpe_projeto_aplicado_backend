import { Request, Response } from "express";
import { getConsumoHoje, getHistorico7Dias, registrarConsumo } from "../services/consumoService";

export const registrarConsumoController = async (req: Request, res: Response): Promise<any> => {
  const usuarioId = (req as any).user.id;

  try {
    const registro = await registrarConsumo(usuarioId);
    return res.status(201).json({
      message: "Consumo registrado com sucesso!",
      registro,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Erro ao registrar consumo.",
    });
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
