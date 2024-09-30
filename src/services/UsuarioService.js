import UsuarioRepository from "../repositories/UsuarioRepository.js";

class UsuarioService {
  async getUsuarioById(id) {
    const user = await UsuarioRepository.findById(id);
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }
    return user;
  }

  async updateUsuario(id, { nome, email, telefone }) {
    const user = await UsuarioRepository.findById(id);
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const updatedUser = await UsuarioRepository.update(id, { nome, email, telefone });

    return updatedUser;
  }
}

export default new UsuarioService();
