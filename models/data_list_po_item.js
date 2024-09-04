"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class data_list_po_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      data_list_po_item.belongsTo(models.data_list_po, {
        foreignKey: "list_po_id",
      })
      data_list_po_item.belongsTo(models.data_product, {
        foreignKey: "product_id",
      })
    }
  }
  data_list_po_item.init(
    {
      quantity: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
      approved: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      list_po_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "data_list_po_item",
    }
  )
  return data_list_po_item
}
