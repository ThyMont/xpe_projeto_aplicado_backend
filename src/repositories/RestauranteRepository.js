import Restaurante from "../models/Restaurante.js";

class RestauranteRepository {
  async findById(id) {
    return await Restaurante.findByPk(id);
  }

  async findByUsuarioId(usuarioId) {
    return await Restaurante.findAll({ where: { usuario_id: usuarioId } });
  }

  async create(restauranteData) {
    return await Restaurante.create(restauranteData);
  }

  async update(id, restauranteData) {
    const restaurante = await Restaurante.findByPk(id);
    if (restaurante) {
      return await restaurante.update(restauranteData);
    }
    return null;
  }

  async delete(id) {
    return await Restaurante.destroy({ where: { id } });
  }

  async findByEmail(email) {
    return await Restaurante.findOne({
      where: { email },
    });
  }

  static async countByUsuarioId(usuarioId) {
    return await Restaurante.count({
      where: {
        usuarioId,
      },
    });
  }
}

export default new RestauranteRepository();
