import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  const agora = new Date();

  const inicioDia = new Date(agora);
  inicioDia.setHours(0, 0, 0, 0);

  const fimDia = new Date(agora);
  fimDia.setHours(23, 59, 59, 999);

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
  const hoje = new Date();
  const dias: { data: string; quantidade_ml: number }[] = [];

  for (let i = 7; i >= 0; i--) {
    const data = new Date();
    data.setDate(hoje.getDate() - i);
    data.setHours(0, 0, 0, 0);

    const inicioDia = new Date(data);
    const fimDia = new Date(data);
    fimDia.setHours(23, 59, 59, 999);

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
      data: data.toISOString().split("T")[0],
      quantidade_ml: total,
    });
  }

  return dias;
};
