import Cardapio from "../models/Cardapio.js";

class CardapioRepository {
  async findByRestauranteId(restauranteId) {
    return await Cardapio.findAll({ where: { restaurante_id: restauranteId } });
  }

  async create(cardapioData) {
    return await Cardapio.create(cardapioData);
  }

  async update(id, cardapioData) {
    const cardapio = await Cardapio.findByPk(id);
    if (cardapio) {
      return await cardapio.update(cardapioData);
    }
    return null;
  }

  async delete(id) {
    return await Cardapio.destroy({ where: { id } });
  }
}

export default new CardapioRepository();
