import Pagamento from "../models/Pagamento.js";
import Pedido from "../models/Pedido.js";

export const createPedido = async (req, res) => {
  const { items, metodo_pagamento } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Itens do pedido são obrigatórios." });
  }

  try {
    const pedido = await Pedido.create({ cliente_id: req.user.id });

    await Promise.all(
      items.map((item) => {
        return pedido.addItem(item.item_id, { through: { quantidade: item.quantidade } });
      })
    );

    const pagamento = await Pagamento.create({
      metodo_pagamento,
      status_pagamento: "Pendente",
      pedido_id: pedido.id,
    });

    res.status(201).json({ pedido, pagamento });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ message: "Erro ao criar pedido." });
  }
};

export const listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      where: {
        cliente_id: req.user.id,
      },
      include: [Pagamento],
    });

    res.status(200).json(pedidos);
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    res.status(500).json({ message: "Erro ao listar pedidos." });
  }
};

export const detalharPedido = async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await Pedido.findOne({
      where: {
        id,
        cliente_id: req.user.id,
      },
      include: [Pagamento],
    });

    if (!pedido) {
      return res.status(404).json({ message: "Pedido não encontrado." });
    }

    res.status(200).json(pedido);
  } catch (error) {
    console.error("Erro ao detalhar pedido:", error);
    res.status(500).json({ message: "Erro ao detalhar pedido." });
  }
};
