import RestauranteRepository from "../repositories/RestauranteRepository.js";

class RestauranteService {
  async createRestaurante({ usuario_id, nome, email, telefone, endereco, horario_funcionamento }) {
    const existingRestaurante = await RestauranteRepository.findByEmail(email);
    if (existingRestaurante) {
      throw new Error("Restaurante com este email já existe");
    }

    const restaurante = await RestauranteRepository.create({
      usuario_id,
      nome,
      email,
      telefone,
      endereco,
      horario_funcionamento,
    });

    return restaurante;
  }

  async listarRestarantes() {}
  async updateRestaurante() {}
  async apagarRestaurante() {}

  static async getRestauranteById(id, usuarioId) {
    const restaurante = await RestauranteRepository.findOne({
      where: { id, usuario_id: usuarioId },
    });
    return restaurante;
  }
}

export default new RestauranteService();
