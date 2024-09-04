"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("data_suppliers", [
      {
        name: "PT. Surya Selindo",
        address: "Tangerang Selatan, Banten, Indonesia",
        contact: "+62515622889245",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "PT. Simo Tech Indonesia",
        address: "Tangerang Selatan, Banten, Indonesia",
        contact: "+6283477901202",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "PT. Maju Salah Mundur Salah",
        address: "Depok, Jawa Barat, Indonesia",
        contact: "+6281290002348",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "PT. Kemarin Sore",
        address: "Sleman, Yogjakarta, Indonesia",
        contact: "+628774392810",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("data_suppliers", null, {})
  },
}
