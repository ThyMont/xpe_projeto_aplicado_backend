import Pedido from "../models/Pedido.js";

class PedidoRepository {
  async findById(id) {
    return await Pedido.findByPk(id);
  }

  async findByRestauranteId(restauranteId) {
    return await Pedido.findAll({ where: { restaurante_id: restauranteId } });
  }

  async create(pedidoData) {
    return await Pedido.create(pedidoData);
  }

  async update(id, pedidoData) {
    const pedido = await Pedido.findByPk(id);
    if (pedido) {
      return await pedido.update(pedidoData);
    }
    return null;
  }

  async delete(id) {
    return await Pedido.destroy({ where: { id } });
  }
}

export default new PedidoRepository();
