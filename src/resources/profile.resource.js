import { userUpdateSchema } from "../schemas/userSchema.js";
import UsuarioService from "../services/UsuarioService.js";

export async function getProfile(req, res) {
  try {
    const userId = req.user.id;
    const usuario = await UsuarioService.getUsuarioById(userId);

    res.status(200).json(usuario);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export async function updateProfile(req, res) {
  const { nome, email, telefone } = req.body;

  const { error } = userUpdateSchema.validate({ nome, email, telefone });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const userId = req.user.id;
    const updatedUser = await UsuarioService.updateUsuario(userId, { nome, email, telefone });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
