import ItemCardapioService from "../services/ItemCardapioService.js";

export async function createItem(req, res) {
  const { nome, descricao, preco, imagem, categoria_id } = req.body;

  try {
    const novoItem = await ItemCardapioService.createItem({
      nome,
      descricao,
      preco,
      imagem,
      categoria_id,
    });
    res.status(201).json(novoItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function listarItens(req, res) {
  const { categoria_id } = req.query;

  try {
    const itens = await ItemCardapioService.listarItens(categoria_id);
    res.status(200).json(itens);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getItemById(req, res) {
  const { id } = req.params;

  try {
    const item = await ItemCardapioService.getItemById(id);
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function updateItem(req, res) {
  const { id } = req.params;
  const { nome, descricao, preco, imagem } = req.body;

  try {
    const itemAtualizado = await ItemCardapioService.updateItem(id, {
      nome,
      descricao,
      preco,
      imagem,
    });
    res.status(200).json(itemAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteItem(req, res) {
  const { id } = req.params;

  try {
    await ItemCardapioService.deleteItem(id);
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
