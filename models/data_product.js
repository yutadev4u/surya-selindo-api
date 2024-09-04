"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class data_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      data_product.belongsTo(models.data_supplier, {
        foreignKey: {
          name: "supplier_id",
          as: "supplier_id",
        },
      })
    }
  }
  data_product.init(
    {
      name: DataTypes.STRING,
      alias: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      uom: DataTypes.STRING,
      product_group_id: DataTypes.INTEGER,
      product_group_name: DataTypes.STRING,
      product_brand_id: DataTypes.INTEGER,
      product_brand_name: DataTypes.STRING,
      product_type_id: DataTypes.INTEGER,
      product_type_name: DataTypes.STRING,
      product_variant_id: DataTypes.INTEGER,
      product_variant_name: DataTypes.STRING,
      price: DataTypes.STRING,
      supplier_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "data_product",
    }
  )
  return data_product
}
