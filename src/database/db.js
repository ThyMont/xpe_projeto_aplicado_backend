import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import mysql2 from "mysql2";
import pg from "pg";

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();
let sequelize = null;

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  logging: false, // Você pode habilitar o log se quiser ver as queries SQL
};

if (options.dialect === "mysql") {
  options.dialectModule = mysql2;
} else if (options.dialect === "postgres") {
  options.dialectModule = pg;
  options.dialectOptions = {
    ssl: {
      require: true, // Habilita o uso do SSL
      rejectUnauthorized: true, // Configure como true em produção para validar o certificado
    },
  };
}
if (process.env.POSTGRES_URL) {
  sequelize = new Sequelize(process.env.POSTGRES_URL_NO_SSL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    options
  );
}

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
