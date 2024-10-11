"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Adicionando o índice único para o campo 'email' na tabela 'Clientes'
    await queryInterface.changeColumn("Clientes", "email", {
      type: Sequelize.STRING,
      allowNull: true, // Se for obrigatório, altere para allowNull: false
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Removendo o índice único no rollback
    await queryInterface.changeColumn("Clientes", "email", {
      type: Sequelize.STRING,
      allowNull: true, // Volta à configuração original sem unique
      unique: false,
    });
  },
};
