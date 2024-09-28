import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import Pedido from "./Pedido.js";

const Pagamento = sequelize.define(
  "Pagamento",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    metodo_pagamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status_pagamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pedido_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Pedido,
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

Pagamento.belongsTo(Pedido, { foreignKey: "pedido_id" });

export default Pagamento;
