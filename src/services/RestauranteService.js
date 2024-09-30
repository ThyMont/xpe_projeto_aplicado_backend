import RestauranteRepository from "../repositories/RestauranteRepository.js";
import CardapioRepository from "../repositories/CardapioRepository.js";
import CategoriaCardapioRepository from "../repositories/CategoriaCardapioRepository.js";

class RestauranteService {
  async createRestaurante({ usuarioId, nome, email, telefone, endereco, horario_funcionamento }) {
    const existingRestaurante = await RestauranteRepository.findByEmail(email);
    if (existingRestaurante) {
      throw new Error("Restaurante com este email já existe");
    }

    const novoRestaurante = await RestauranteRepository.create({
      usuarioId,
      nome,
      email,
      telefone,
      endereco,
      horario_funcionamento,
      slug,
    });

    const restaurantesCount = await RestauranteRepository.countByUsuarioId(usuarioId);
    if (restaurantesCount >= 3) {
      throw new Error("Você não pode ter mais de 3 restaurantes");
    }

    const novoCardapio = await CardapioRepository.create({
      descricao: "Cardápio do " + novoRestaurante.nome,
      restaurante_id: novoRestaurante.id,
    });

    return { restaurante: novoRestaurante, cardapio: novoCardapio };
  }

  async getRestaurantesByUsuario(usuarioId) {
    const restaurantes = await RestauranteRepository.findByUsuarioId(usuarioId);
    return restaurantes;
  }
  async updateRestaurante(id, usuarioId, dadosAtualizados) {
    const restaurante = await RestauranteRepository.findOne({
      where: { id, usuarioId },
    });

    if (!restaurante) {
      throw new Error("Restaurante não encontrado");
    }

    const restauranteAtualizado = await RestauranteRepository.update(id, dadosAtualizados);
    return restauranteAtualizado;
  }

  static async getRestauranteById(id, usuarioId) {
    const restaurante = await RestauranteRepository.findOne({
      where: { id, usuario_id: usuarioId },
    });

    if (!restaurante) {
      throw new Error("Restaurante não encontrado");
    }

    const cardapio = await CardapioRepository.findByRestauranteId(restaurante.id);

    const categorias = await CategoriaCardapioRepository.findByCardapioId(cardapio.id);

    const categoriasComItens = await Promise.all(
      categorias.map(async (categoria) => {
        const itens = await ItemCardapioRepository.findByCategoriaId(categoria.id);
        return { ...categoria, itens };
      })
    );

    return { restaurante, cardapio: { ...cardapio, categorias: categoriasComItens } };
  }
}

export default new RestauranteService();
