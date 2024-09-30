import Usuario from "../models/Usuario.js";

class UsuarioRepository {
  async findById(id) {
    return await Usuario.findByPk(id);
  }

  async findByEmail(email) {
    return await Usuario.findOne({
      where: { email },
    });
  }

  async create(usuarioData) {
    return await Usuario.create(usuarioData);
  }

  async update(id, usuarioData) {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      return await usuario.update(usuarioData);
    }
    return null;
  }

  async delete(id) {
    return await Usuario.destroy({ where: { id } });
  }
}

export default new UsuarioRepository();
