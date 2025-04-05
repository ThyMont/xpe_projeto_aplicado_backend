import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response): Promise<any> => {
  const { nome, email, senha } = req.body;

  try {
    const existing = await prisma.usuario.findUnique({ where: { email } });

    if (existing) {
      return res.status(400).json({ message: "E-mail já cadastrado." });
    }

    const senha_hash = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha_hash,
      },
    });

    return res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao registrar usuário." });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, senha } = req.body;

  try {
    const user = await prisma.usuario.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(senha, user.senha_hash))) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: "2h",
    });

    return res.json({
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao fazer login." });
  }
};
