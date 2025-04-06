import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const registerUser = async (nome: string, email: string, senha: string) => {
  const existing = await prisma.usuario.findUnique({ where: { email } });
  if (existing) {
    throw new Error("E-mail já cadastrado.");
  }

  const senha_hash = await bcrypt.hash(senha, 10);

  const novoUsuario = await prisma.usuario.create({
    data: {
      nome,
      email,
      senha_hash,
    },
  });

  return {
    id: novoUsuario.id,
    nome: novoUsuario.nome,
    email: novoUsuario.email,
  };
};

export const loginUser = async (email: string, senha: string) => {
  const user = await prisma.usuario.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(senha, user.senha_hash))) {
    throw new Error("Credenciais inválidas.");
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
    expiresIn: "2h",
  });

  return {
    token,
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
    },
  };
};
