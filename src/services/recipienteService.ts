import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criarRecipiente = async (usuarioId: number, nome: string, volume_ml: number) => {
  const novo = await prisma.recipiente.create({
    data: {
      usuario_id: usuarioId,
      nome,
      volume_ml,
    },
  });

  return novo;
};
