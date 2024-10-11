"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pagamentos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      metodo_pagamento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status_pagamento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pedido_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Pedidos", // Nome da tabela
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
    await queryInterface.dropTable("Pagamentos");
  },
};
