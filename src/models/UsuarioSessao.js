import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import Usuario from "./Usuario.js";

const UsuarioSessao = sequelize.define(
  "UsuarioSessao",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token_sessao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiracao: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuario,
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

UsuarioSessao.belongsTo(Usuario, { foreignKey: "usuario_id" });

export default UsuarioSessao;
