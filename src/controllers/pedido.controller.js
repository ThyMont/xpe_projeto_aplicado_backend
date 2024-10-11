import PedidoService from "../services/PedidoService.js";

export const createPedido = async (req, res) => {
  const { items, metodo_pagamento } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Itens do pedido são obrigatórios." });
  }

  try {
    const { novoPedido, pagamento } = await PedidoService.registrarPedido({
      cliente_id: req.user.id,
      restaurante_id: req.user.restaurante_id,
      itens: items,
      metodo_pagamento,
    });
    res.status(201).json({ novoPedido, pagamento });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ message: error.message });
  }
};

export const listarPedidos = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await PedidoService.listarPedidos(req.user.id, limit, offset);
    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      totalItems: count,
      totalPages,
      currentPage: page,
      pedidos: rows,
    });
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    res.status(500).json({ message: error.message });
  }
};

export const detalharPedido = async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await PedidoService.detalharPedido(id, req.user.id);
    res.status(200).json(pedido);
  } catch (error) {
    console.error("Erro ao detalhar pedido:", error);
    res.status(500).json({ message: error.message });
  }
};

export const atualizarStatusPedido = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status é obrigatório." });
  }

  try {
    const pedido = await PedidoRepository.findOne({ where: { id } });

    if (!pedido) {
      return res.status(404).json({ message: "Pedido não encontrado." });
    }

    pedido.status = status;
    await pedido.save();

    res.status(200).json({ message: "Status do pedido atualizado com sucesso.", pedido });
  } catch (error) {
    console.error("Erro ao atualizar status do pedido:", error);
    res.status(500).json({ message: "Erro ao atualizar status do pedido." });
  }
};

export const listarHistoricoPedidos = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Pedido.findAndCountAll({
      where: {
        restaurante_id: req.user.restaurante_id,
      },
      include: [Pagamento],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    const totalPages = Math.ceil(count / limit);
    res.status(200).json({
      totalItems: count,
      totalPages,
      currentPage: page,
      pedidos: rows,
    });
  } catch (error) {
    console.error("Erro ao listar histórico de pedidos:", error);
    res.status(500).json({ message: error.message });
  }
};
