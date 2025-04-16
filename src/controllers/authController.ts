import { Request, Response } from "express";
import { registerUser, loginUser, getUsuarioById } from "../services/authService";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response): Promise<any> => {
  const { nome, email, senha } = req.body;

  try {
    const user = await registerUser(nome, email, senha);
    return res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user,
    });
  } catch (err: any) {
    console.error(err);
    const status = err.message === "E-mail já cadastrado." ? 400 : 500;
    return res.status(status).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, senha } = req.body;

  try {
    const result = await loginUser(email, senha);
    return res.json(result);
  } catch (err: any) {
    console.error(err);
    const status = err.message === "Credenciais inválidas." ? 401 : 500;
    return res.status(status).json({ message: err.message });
  }
};

export const me = async (req: Request, res: Response): Promise<any> => {
  const usuarioId = (req as any).user.id;

  try {
    const user = await getUsuarioById(usuarioId);
    return res.status(200).json(user);
  } catch (err: any) {
    console.error(err);
    return res.status(404).json({ message: err.message });
  }
};

export const refreshTokenController = async (req: Request, res: Response): Promise<any> => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token não fornecido." });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as {
      id: number;
      email: string;
    };

    const newAccessToken = jwt.sign(
      { id: payload.id, email: payload.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );

    return res.json({ token: newAccessToken });
  } catch (err) {
    return res.status(401).json({ message: "Refresh token inválido ou expirado." });
  }
};
