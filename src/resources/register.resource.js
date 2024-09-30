import { userSchema } from "../schemas/userSchema.js";
import RegisterService from "../services/RegisterService.js";

export async function register(req, res) {
  const { nome, email, senha, telefone } = req.body;

  const { error } = userSchema.validate({ nome, email, senha, telefone });

  if (error) {
    return res.status(400).json({ error: error.details[0].message }); // Retorna erro de validação
  }

  try {
    const usuario = await RegisterService.register({ nome, email, senha, telefone });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
