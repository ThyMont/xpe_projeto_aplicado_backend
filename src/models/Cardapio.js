import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import Restaurante from "./Restaurante.js";

const Cardapio = sequelize.define(
  "Cardapio",
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
    descricao: {
      type: DataTypes.TEXT,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    restaurante_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Restaurante,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    createdAt: "criado_em",
    updatedAt: false,
  }
);

Cardapio.belongsTo(Restaurante, { foreignKey: "restaurante_id" });

export default Cardapio;
