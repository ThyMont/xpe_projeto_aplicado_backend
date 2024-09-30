import CardapioService from "../services/CardapioService.js";
import { cardapioSchema } from "../schemas/cardapioSchema.js"; // Supondo que você tenha um schema para validação

export async function editarCardapio(req, res) {
  const { cardapioId } = req.params;
  const { descricao } = req.body;

  const { error } = cardapioSchema.validate({ descricao });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const cardapioAtualizado = await CardapioService.editarCardapio(cardapioId, { descricao });
    res.status(200).json(cardapioAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
