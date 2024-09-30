import CategoriaCardapio from "../models/CategoriaCardapio.js";

class CategoriaCardapioService {
  async createCategoria({ nome, cardapio_id }) {
    const novaCategoria = await CategoriaCardapio.create({ nome, cardapio_id });
    return novaCategoria;
  }

  async updateCategoria(id, { nome }) {
    const categoria = await CategoriaCardapio.findByPk(id);
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }
    categoria.nome = nome;
    await categoria.save();
    return categoria;
  }

  async listarCategorias(cardapio_id) {
    return await CategoriaCardapio.findAll({ where: { cardapio_id } });
  }

  async deleteCategoria(id) {
    const categoria = await CategoriaCardapio.findByPk(id);
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }
    await categoria.destroy();
  }

  async getCategoriaById(id) {
    const categoria = await CategoriaCardapio.findByPk(id);
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }
    return categoria;
  }
}

export default new CategoriaCardapioService();
