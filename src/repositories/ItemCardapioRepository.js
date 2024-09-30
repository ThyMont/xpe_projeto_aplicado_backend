import ItemCardapio from "../models/ItemCardapio.js";

class ItemCardapioRepository {
  async findByCategoriaId(categoriaId) {
    return await ItemCardapio.findAll({ where: { categoria_id: categoriaId } });
  }

  async countByCategoriaId(categoria_id) {
    return await ItemCardapio.count({
      where: { categoria_id },
    });
  }
}

export default new ItemCardapioRepository();
