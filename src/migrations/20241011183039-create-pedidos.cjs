"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pedidos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      data_pedido: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      restaurante_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Restaurante", // Nome da tabela
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Clientes", // Nome da tabela
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      criado_em: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Pedidos");
  },
};
