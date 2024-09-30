import CategoriaCardapio from "../models/CategoriaCardapio.js";

class CategoriaCardapioRepository {
  async findByCardapioId(cardapioId) {
    return await CategoriaCardapio.findAll({ where: { cardapio_id: cardapioId } });
  }
}

export default new CategoriaCardapioRepository();
