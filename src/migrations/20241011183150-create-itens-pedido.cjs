"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ItensPedido", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
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
      item_cardapio_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Cardapio", // Nome da tabela
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
    await queryInterface.dropTable("ItensPedido");
  },
};
