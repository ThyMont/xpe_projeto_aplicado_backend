import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import Cardapio from "./Cardapio.js";

const CategoriaCardapio = sequelize.define(
  "CategoriaCardapio",
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
    cardapio_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Cardapio,
        key: "id",
      },
      allowNull: false,
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true,
    createdAt: "criado_em",
    updatedAt: false,
  }
);

CategoriaCardapio.belongsTo(Cardapio, { foreignKey: "cardapio_id" });

export default CategoriaCardapio;
