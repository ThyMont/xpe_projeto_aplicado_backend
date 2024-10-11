import Pagamento from "../models/Pagamento.js";

class PagamentoRepository {
  async findByPedidoId(pedidoId) {
    return await Pagamento.findOne({ where: { pedido_id: pedidoId } });
  }

  async create(pagamentoData) {
    return await Pagamento.create(pagamentoData);
  }

  async update(id, pagamentoData) {
    const pagamento = await Pagamento.findByPk(id);
    if (pagamento) {
      return await pagamento.update(pagamentoData);
    }
    return null;
  }

  async delete(id) {
    return await Pagamento.destroy({ where: { id } });
  }
}

export default new PagamentoRepository();
