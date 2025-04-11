import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

const TIMEZONE = "America/Sao_Paulo";

export const registrarConsumo = async (usuarioId: number) => {
  const recipiente = await prisma.recipiente.findFirst({
    where: { usuario_id: usuarioId },
    orderBy: { criado_em: "desc" },
  });

  if (!recipiente) {
    throw new Error("Nenhum recipiente cadastrado.");
  }

  const registro = await prisma.registroAgua.create({
    data: {
      usuario_id: usuarioId,
      quantidade_ml: recipiente.volume_ml,
      recipiente_id: recipiente.id,
    },
  });

  return registro;
};

export const getConsumoHoje = async (usuarioId: number) => {
  const inicioDia = DateTime.now().setZone(TIMEZONE).startOf("day").toJSDate();
  const fimDia = DateTime.now().setZone(TIMEZONE).endOf("day").toJSDate();

  const registros = await prisma.registroAgua.findMany({
    where: {
      usuario_id: usuarioId,
      registrado_em: {
        gte: inicioDia,
        lte: fimDia,
      },
    },
  });

  const totalConsumido = registros.reduce((soma, r) => soma + r.quantidade_ml, 0);

  return { totalConsumido, registros };
};

export const getHistorico8Dias = async (usuarioId: number) => {
  const hoje = DateTime.now().setZone(TIMEZONE).startOf("day");
  const dias: { data: string; quantidade_ml: number }[] = [];

  for (let i = 7; i >= 0; i--) {
    const dia = hoje.minus({ days: i });
    const inicioDia = dia.startOf("day").toJSDate();
    const fimDia = dia.endOf("day").toJSDate();

    const registros = await prisma.registroAgua.findMany({
      where: {
        usuario_id: usuarioId,
        registrado_em: {
          gte: inicioDia,
          lte: fimDia,
        },
      },
    });

    const total = registros.reduce((soma, r) => soma + r.quantidade_ml, 0);

    dias.push({
      data: dia.toFormat("yyyy-MM-dd"),
      quantidade_ml: total,
    });
  }

  return dias;
};
