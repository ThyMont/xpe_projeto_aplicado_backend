import sequelize from "./db.js";
import Usuario from "../models/Usuario.js";
import Restaurante from "../models/Restaurante.js";
import Cardapio from "../models/Cardapio.js";
import Pedido from "../models/Pedido.js";
import ItemPedido from "../models/ItemPedido.js";
import Cliente from "../models/Cliente.js";
import Pagamento from "../models/Pagamento.js";
import UsuarioSessao from "../models/UsuarioSessao.js";

// Sincronizar todas as tabelas com o banco de dados
async function syncModels() {
  try {
    await sequelize.sync({ force: false }); // Use "force: true" para recriar tabelas (apaga dados)
    console.log("Tabelas criadas/sincronizadas com sucesso.");
  } catch (err) {
    console.error("Erro ao sincronizar tabelas:", err);
  } finally {
    await sequelize.close();
  }
}

syncModels();
