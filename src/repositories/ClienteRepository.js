import Cliente from "../models/Cliente.js";

class ClienteRepository {
  async findById(id) {
    return await Cliente.findByPk(id);
  }

  async create(clienteData) {
    return await Cliente.create(clienteData);
  }

  async update(id, clienteData) {
    const cliente = await Cliente.findByPk(id);
    if (cliente) {
      return await cliente.update(clienteData);
    }
    return null;
  }

  async delete(id) {
    return await Cliente.destroy({ where: { id } });
  }
}

export default new ClienteRepository();
