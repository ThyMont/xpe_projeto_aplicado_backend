import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const atualizarMeta = async (usuarioId: number, novaQuantidade: number) => {
  // Desativa metas antigas
  await prisma.meta.updateMany({
    where: {
      usuario_id: usuarioId,
      ativa: true,
    },
    data: {
      ativa: false,
    },
  });

  // Cria nova meta
  const novaMeta = await prisma.meta.create({
    data: {
      usuario_id: usuarioId,
      quantidade_ml: novaQuantidade,
      ativa: true,
    },
  });

  return novaMeta;
};

export const getMetaAtiva = async (usuarioId: number) => {
  const meta = await prisma.meta.findFirst({
    where: {
      usuario_id: usuarioId,
      ativa: true,
    },
  });

  return meta;
};
