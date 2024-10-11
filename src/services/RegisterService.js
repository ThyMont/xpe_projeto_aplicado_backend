import UsuarioRepository from "../repositories/UsuarioRepository.js";
import bcrypt from "bcrypt";

class RegisterService {
  async register({ nome, email, senha, telefone }) {
    const existingUser = await UsuarioRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Usuário já existe com esse email");
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = await UsuarioRepository.create({
      nome,
      email,
      senha_hash: hashedPassword,
      telefone,
    });

    return newUser;
  }

  async registerCliente({ nome, email, senha, telefone, endereco_entrega }) {
    const existingCliente = await ClienteRepository.findByEmail(email);
    if (existingCliente) {
      throw new Error("Cliente já existe com esse email");
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const newCliente = await ClienteRepository.create({
      nome,
      email,
      telefone,
      endereco_entrega,
      senha_hash: hashedPassword,
    });

    return newCliente;
  }
}

export default new RegisterService();
