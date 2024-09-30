import RestauranteService from "../services/RestauranteService.js";

export async function createRestaurante(req, res) {
  const { nome, email, telefone, endereco, horario_funcionamento, slug } = req.body;
  const usuario_id = req.user.id;

  const { error } = restaurantSchema.validate({
    nome,
    email,
    telefone,
    endereco,
    horario_funcionamento,
    slug,
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const restaurante = await RestauranteService.createRestaurante({
      usuario_id,
      nome,
      email,
      telefone,
      endereco,
      horario_funcionamento,
      slug,
    });
    res.status(201).json({ restaurante });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function listarRestarantes(req, res) {
  const usuarioId = req.user.id;

  try {
    const restaurantes = await RestauranteService.getRestaurantesByUsuario(usuarioId);
    res.json(restaurantes);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar restaurantes", error: error.message });
  }
}

export async function updateRestaurante(req, res) {
  const { id } = req.params;
  const { nome, email, telefone, endereco, horario_funcionamento } = req.body;
  const usuarioId = req.user.id;

  try {
    const updatedRestaurante = await RestauranteService.updateRestaurante({
      id,
      usuarioId,
      nome,
      email,
      telefone,
      endereco,
      horario_funcionamento,
    });

    if (!updatedRestaurante) {
      return res
        .status(404)
        .json({ message: "Restaurante não encontrado ou não pertence ao usuário" });
    }

    res.json({ message: "Restaurante atualizado com sucesso", restaurante: updatedRestaurante });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar restaurante", error: error.message });
  }
}
export async function apagarRestaurante(req, res) {
  const { id } = req.params;
  const usuarioId = req.user.id;
  try {
    const deleted = await RestauranteService.deleteRestaurante(id, usuarioId);

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Restaurante não encontrado ou não pertence ao usuário" });
    }

    res.json({ message: "Restaurante apagado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao apagar restaurante", error: error.message });
  }
}
export async function detalharRestaurante(req, res) {
  const { id } = req.params;
  const usuarioId = req.user.id;

  try {
    const restaurante = await RestauranteService.getRestauranteById(id, usuarioId);

    if (!restaurante) {
      return res
        .status(404)
        .json({ message: "Restaurante não encontrado ou não pertence ao usuário" });
    }

    res.json(restaurante);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar restaurante", error: error.message });
  }
}
