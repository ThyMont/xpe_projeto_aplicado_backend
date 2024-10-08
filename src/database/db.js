import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Criar a instância do Sequelize com os parâmetros do banco de dados
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
  logging: false, // Você pode habilitar o log se quiser ver as queries SQL
});

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
