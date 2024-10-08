import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import Usuario from "./Usuario.js";

const Restaurante = sequelize.define(
  "Restaurante",
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
    },
    telefone: {
      type: DataTypes.STRING,
    },
    endereco: {
      type: DataTypes.STRING,
    },
    horario_funcionamento: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING, // URL ou caminho do arquivo da imagem do avatar
      allowNull: true,
    },
    capa: {
      type: DataTypes.STRING, // URL ou caminho do arquivo da imagem da capa
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true, // Garante que o slug seja único
      allowNull: false, // O slug é obrigatório
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

Restaurante.belongsTo(Usuario, { foreignKey: "usuario_id" });

export default Restaurante;
