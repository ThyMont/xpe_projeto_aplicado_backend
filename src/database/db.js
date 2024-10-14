import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import mysql2 from "mysql2";

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  logging: false,
};

if (options.dialect === "mysql") {
  options.dialectModule = mysql2;
}
// Criar a instância do Sequelize com os parâmetros do banco de dados
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  options
);

// Teste de conexão
sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso.");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });

export default sequelize;
