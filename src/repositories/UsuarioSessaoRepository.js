import UsuarioSessao from "../models/UsuarioSessao.js";

class UsuarioSessaoRepository {
  async findById(id) {
    return await UsuarioSessao.findByPk(id);
  }

  async findByUsuarioId(usuarioId) {
    return await UsuarioSessao.findAll({ where: { usuario_id: usuarioId } });
  }

  async create(usuarioSessaoData) {
    return await UsuarioSessao.create(usuarioSessaoData);
  }

  async update(id, usuarioSessaoData) {
    const usuarioSessao = await UsuarioSessao.findByPk(id);
    if (usuarioSessao) {
      return await usuarioSessao.update(usuarioSessaoData);
    }
    return null;
  }

  async delete(id) {
    return await UsuarioSessao.destroy({ where: { id } });
  }
}

export default new UsuarioSessaoRepository();
