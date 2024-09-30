import CategoriaCardapioService from "../services/CategoriaCardapioService.js"; // Importe o serviço adequado

export async function createCategoria(req, res) {
  const { nome, cardapio_id } = req.body;

  try {
    const categoria = await CategoriaCardapioService.createCategoria({ nome, cardapio_id });
    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function updateCategoria(req, res) {
  const { id } = req.params;
  const { nome } = req.body;

  try {
    const updatedCategoria = await CategoriaCardapioService.updateCategoria(id, { nome });
    res.json(updatedCategoria);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteCategoria(req, res) {
  const { id } = req.params;

  try {
    await CategoriaCardapioService.deleteCategoria(id);
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getCategoria(req, res) {
  const { id } = req.params;

  try {
    const categoria = await CategoriaCardapioService.getCategoriaById(id);
    res.json(categoria);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
