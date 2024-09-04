"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class data_list_po extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      data_list_po.hasMany(models.data_list_po_item, {
        foreignKey: "list_po_id",
      })
    }
  }
  data_list_po.init(
    {
      name: DataTypes.STRING,
      prepared_by: DataTypes.STRING,
      approved: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "data_list_po",
    }
  )
  return data_list_po
}
