import CardapioRepository from "../repositories/CardapioRepository.js";

class CardapioService {
  async editarCardapio(cardapioId, { descricao }) {
    const cardapio = await CardapioRepository.findById(cardapioId);
    if (!cardapio) {
      throw new Error("Cardápio não encontrado");
    }

    const cardapioAtualizado = await CardapioRepository.update(cardapioId, { descricao });
    return cardapioAtualizado;
  }
}

export default new CardapioService();
