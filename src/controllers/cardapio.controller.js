import CardapioService from "../services/CardapioService.js";
import { cardapioSchema } from "../schemas/cardapioSchema.js"; // Supondo que você tenha um schema para validação

export async function editarCardapio(req, res) {
  const { cardapioId } = req.params;
  const { descricao } = req.body;
  const usuarioId = req.user.id;

  const { error } = cardapioSchema.validate({ descricao });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const cardapio = await CardapioService.editarCardapio(cardapioId, usuarioId, descricao);
    res.status(200).json(cardapio);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
}

export async function listCategorias(req, res) {
  const { cardapioId } = req.params;
  const usuarioId = req.user.id;

  try {
    const categorias = await CardapioService.listarCategorias(cardapioId, usuarioId);
    res.status(200).json(categorias);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
}
