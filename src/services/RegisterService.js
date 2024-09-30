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
}

export default new RegisterService();
