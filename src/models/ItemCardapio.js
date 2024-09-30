import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import CategoriaCardapio from "./CategoriaCardapio.js";

const ItemCardapio = sequelize.define(
  "ItemCardapio",
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
    imagem: {
      type: DataTypes.STRING, // URL da imagem
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      references: {
        model: CategoriaCardapio,
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

ItemCardapio.belongsTo(CategoriaCardapio, { foreignKey: "categoria_id" });

export default ItemCardapio;
