"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("ItemCardapio", "imagem", "imagemUrl");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("ItemCardapio", "imagemUrl", "imagem");
  },
};
