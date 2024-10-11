import { userSchema } from "../schemas/userSchema.js";
import { clienteSchema } from "../schemas/clienteSchema.js"; // Importação ajustada do clienteSchema
import RegisterService from "../services/RegisterService.js";

export async function register(req, res) {
  const { nome, email, senha, telefone } = req.body;

  const { error } = userSchema.validate({ nome, email, senha, telefone });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const usuario = await RegisterService.register({ nome, email, senha, telefone });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function registerCliente(req, res) {
  const { nome, email, senha, telefone, endereco_entrega } = req.body;

  const { error } = clienteSchema.validate({ nome, email, senha, telefone, endereco_entrega });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const cliente = await RegisterService.registerCliente({
      nome,
      email,
      senha,
      telefone,
      endereco_entrega,
    });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
