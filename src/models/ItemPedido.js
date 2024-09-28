import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import Pedido from "./Pedido.js";
import Cardapio from "./Cardapio.js";

const ItensPedido = sequelize.define(
  "ItensPedido",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    pedido_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Pedido,
        key: "id",
      },
    },
    item_cardapio_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Cardapio,
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

ItensPedido.belongsTo(Pedido, { foreignKey: "pedido_id" });
ItensPedido.belongsTo(Cardapio, { foreignKey: "item_cardapio_id" });

export default ItensPedido;
