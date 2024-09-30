import CardapioRepository from "../repositories/CardapioRepository.js";
import CategoriaCardapioRepository from "../repositories/CategoriaCardapioRepository.js";

class CardapioService {
  async editarCardapio(cardapioId, { descricao }) {
    const cardapio = await CardapioRepository.findById(cardapioId);
    if (!cardapio) {
      throw new Error("Cardápio não encontrado");
    }

    const cardapioAtualizado = await CardapioRepository.update(cardapioId, { descricao });
    return cardapioAtualizado;
  }

  async listarCategorias(cardapio_id, usuarioId) {
    // Verifica se o cardápio pertence ao usuário
    const cardapio = await CardapioRepository.findByIdAndUserId(cardapio_id, usuarioId);
    if (!cardapio) {
      throw { status: 404, message: "Cardápio não encontrado ou não pertence ao usuário." };
    }

    // Retorna as categorias do cardápio
    return await CategoriaCardapioRepository.findByCardapioId(cardapio.id);
  }
}

export default new CardapioService();
