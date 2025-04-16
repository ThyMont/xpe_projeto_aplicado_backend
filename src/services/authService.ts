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

  // Cria o usuário
  const novoUsuario = await prisma.usuario.create({
    data: {
      nome,
      email,
      senha_hash,
    },
  });

  // Cria a meta padrão de 2000ml
  await prisma.meta.create({
    data: {
      usuario_id: novoUsuario.id,
      quantidade_ml: 2000,
      ativa: true,
    },
  });

  // Cria o recipiente padrão "Copo"
  await prisma.recipiente.create({
    data: {
      usuario_id: novoUsuario.id,
      nome: "Copo",
      volume_ml: 200,
    },
  });

  return {
    id: novoUsuario.id,
    nome: novoUsuario.nome,
    email: novoUsuario.email,
  };
};

const generateTokens = (payload: object) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "2h",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const loginUser = async (email: string, senha: string) => {
  const user = await prisma.usuario.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(senha, user.senha_hash))) {
    throw new Error("Credenciais inválidas.");
  }

  const { accessToken, refreshToken } = generateTokens({ id: user.id, email: user.email });

  return {
    token: accessToken,
    refreshToken,
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
    },
  };
};

export const getUsuarioById = async (id: number) => {
  const user = await prisma.usuario.findUnique({
    where: { id },
    select: {
      id: true,
      nome: true,
      email: true,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  return user;
};
