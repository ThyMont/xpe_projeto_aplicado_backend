import ItemCardapioRepository from "../repositories/ItemCardapioRepository.js";

class ItemCardapioService {
  async createItem({ nome, descricao, preco, imagem, categoria_id }) {
    const itensCount = await ItemCardapioRepository.countByCategoriaId(categoria_id);
    if (itensCount >= 10) {
      throw new Error("Não é possível adicionar mais de 10 itens a esta categoria");
    }

    const novoItem = await ItemCardapioRepository.create({
      nome,
      descricao,
      preco,
      imagem,
      categoria_id,
    });

    return novoItem;
  }

  async listarItemsPorCategoria(categoria_id) {
    const items = await ItemCardapioRepository.findByCategoriaId(categoria_id);

    return items;
  }

  async updateItem(id, { nome, descricao, preco, imagem }) {
    const itemExistente = await ItemCardapioRepository.findById(id);
    if (!itemExistente) {
      throw new Error("Item não encontrado");
    }

    const itemAtualizado = await ItemCardapioRepository.update(id, {
      nome,
      descricao,
      preco,
      imagem,
    });

    return itemAtualizado;
  }

  async deleteItem(id) {
    const itemExistente = await ItemCardapioRepository.findById(id);
    if (!itemExistente) {
      throw new Error("Item não encontrado");
    }

    // Deleta o item
    await ItemCardapioRepository.delete(id);
    return { message: "Item excluído com sucesso" };
  }

  async getItemById(id) {
    const item = await ItemCardapioRepository.findById(id);
    if (!item) {
      throw new Error("Item não encontrado");
    }
    return item;
  }
}

export default new ItemCardapioService();
