"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("data_list_po_items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      total_price: {
        type: Sequelize.INTEGER,
      },
      approved: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "data_products",
          key: "id",
        },
      },
      list_po_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "data_list_pos",
          key: "id",
        },
        onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("data_list_po_items")
  },
}
