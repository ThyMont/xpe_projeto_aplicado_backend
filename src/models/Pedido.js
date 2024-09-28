import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import Restaurante from "./Restaurante.js";
import Cliente from "./Cliente.js";

const Pedido = sequelize.define(
  "Pedido",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    data_pedido: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    restaurante_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Restaurante,
        key: "id",
      },
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Cliente,
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

Pedido.belongsTo(Restaurante, { foreignKey: "restaurante_id" });
Pedido.belongsTo(Cliente, { foreignKey: "cliente_id" });

export default Pedido;
