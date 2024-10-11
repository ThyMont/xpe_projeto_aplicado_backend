import ItemPedido from "../models/ItemPedido.js";

class ItensPedidoRepository {
  async findByPedidoId(pedidoId) {
    return await ItemPedido.findAll({ where: { pedido_id: pedidoId } });
  }

  async create(itensPedidoData) {
    return await ItemPedido.create(itensPedidoData);
  }

  async delete(id) {
    return await ItemPedido.destroy({ where: { id } });
  }
}

export default new ItensPedidoRepository();
