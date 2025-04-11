import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPainelResumo = async (usuarioId: number) => {
  // Meta ativa
  const meta = await prisma.meta.findFirst({
    where: { usuario_id: usuarioId, ativa: true },
  });

  const metaDiaria = meta?.quantidade_ml ?? 0;

  // Consumo de hoje
  const agora = new Date();
  const inicioDia = new Date(agora);
  inicioDia.setHours(0, 0, 0, 0);
  const fimDia = new Date(agora);
  fimDia.setHours(23, 59, 59, 999);

  const registros = await prisma.registroAgua.findMany({
    where: {
      usuario_id: usuarioId,
      registrado_em: { gte: inicioDia, lte: fimDia },
    },
  });

  const consumoHoje = registros.reduce((total, r) => total + r.quantidade_ml, 0);
  const progresso = metaDiaria > 0 ? Math.round((consumoHoje / metaDiaria) * 100) : 0;

  // Recipiente mais recente
  const recipientePadrao = await prisma.recipiente.findFirst({
    where: { usuario_id: usuarioId },
    orderBy: { criado_em: "desc" },
  });

  return {
    meta_diaria: metaDiaria,
    consumo_hoje: consumoHoje,
    progresso_percentual: progresso > 100 ? 100 : progresso,
    recipiente_padrao: recipientePadrao ?? null,
  };
};
