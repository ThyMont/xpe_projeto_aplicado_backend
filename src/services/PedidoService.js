import PedidoRepository from "../repositories/PedidoRepository.js";
import ItemPedidoRepository from "../repositories/ItemPedidoRepository.js";
import PagamentoRepository from "../repositories/PagamentoRepository.js";
import sequelize from "../database/db.js";

class PedidoService {
  async registrarPedido({ cliente_id, restaurante_id, itens, metodo_pagamento }) {
    if (!itens || itens.length === 0) {
      throw new Error("Os itens do pedido são obrigatórios.");
    }

    const transaction = await sequelize.transaction();

    try {
      const novoPedido = await PedidoRepository.create(
        {
          cliente_id,
          restaurante_id,
        },
        { transaction }
      );

      for (const item of itens) {
        await ItemPedidoRepository.create(
          {
            pedido_id: novoPedido.id,
            item_cardapio_id: item.item_cardapio_id,
            quantidade: item.quantidade,
            preco: item.preco,
          },
          { transaction }
        );
      }

      const pagamento = await PagamentoRepository.create(
        {
          metodo_pagamento,
          status_pagamento: "Pendente",
          pedido_id: novoPedido.id,
        },
        { transaction }
      );

      await transaction.commit();
      return { novoPedido, pagamento };
    } catch (error) {
      await transaction.rollback();
      throw new Error("Erro ao registrar o pedido: " + error.message);
    }
  }

  async listarPedidos(cliente_id) {
    try {
      const pedidos = await PedidoRepository.findAll({
        where: { cliente_id },
        include: ["itens", "pagamentos"],
      });

      const pedidosComTotal = pedidos.map((pedido) => {
        const total = pedido.itens.reduce((acc, item) => {
          return acc + item.preco * item.quantidade;
        }, 0);

        return {
          ...pedido.toJSON(),
          total,
        };
      });

      return pedidosComTotal;
    } catch (error) {
      throw new Error("Erro ao listar os pedidos: " + error.message);
    }
  }

  async detalharPedido(pedido_id, cliente_id) {
    try {
      const pedido = await PedidoRepository.findOne({
        where: {
          id: pedido_id,
          cliente_id,
        },
        include: ["itens", "pagamentos"],
      });

      if (!pedido) {
        throw new Error("Pedido não encontrado.");
      }

      const total = pedido.itens.reduce((acc, item) => {
        return acc + item.preco * item.quantidade;
      }, 0);

      return {
        ...pedido.toJSON(),
        total,
      };
    } catch (error) {
      throw new Error("Erro ao detalhar o pedido: " + error.message);
    }
  }
}

export default new PedidoService();
