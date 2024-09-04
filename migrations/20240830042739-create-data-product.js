"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("data_products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "",
      },
      alias: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      uom: {
        type: Sequelize.STRING,
      },
      product_group_id: {
        type: Sequelize.INTEGER,
      },
      product_group_name: {
        type: Sequelize.STRING,
      },
      product_brand_id: {
        type: Sequelize.INTEGER,
      },
      product_brand_name: {
        type: Sequelize.STRING,
      },
      product_type_id: {
        type: Sequelize.INTEGER,
      },
      product_type_name: {
        type: Sequelize.STRING,
      },
      product_variant_id: {
        type: Sequelize.INTEGER,
      },
      product_variant_name: {
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      supplier_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "data_suppliers",
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
    await queryInterface.dropTable("data_products")
  },
}
