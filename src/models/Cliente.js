import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const Cliente = sequelize.define(
  "Cliente",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefone: {
      type: DataTypes.STRING,
    },
    endereco_entrega: {
      type: DataTypes.STRING,
    },
    senha_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "criado_em",
    updatedAt: false,
  }
);

export default Cliente;
