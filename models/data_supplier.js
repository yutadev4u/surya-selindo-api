"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class data_supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      data_supplier.hasMany(models.data_product, {
        foreignKey: {
          name: "supplier_id",
          as: "products",
        },
      })
    }
  }

  data_supplier.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      contact: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "data_supplier",
    }
  )
  return data_supplier
}
