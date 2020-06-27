const { Model, DataTypes } = require("sequelize");

const { BOOLEAN } = DataTypes;

module.exports = (sequelize) => {
  class PostCategory extends Model {}
  PostCategory.init(
    {
      fantasy: {
        type: BOOLEAN,
        allowNull: false,
      },
      romantic: {
        type: BOOLEAN,
        allowNull: false,
      },
      drama: {
        type: BOOLEAN,
        allowNull: false,
      },
      novel: {
        type: BOOLEAN,
        allowNull: false,
      },      
    },
    {
      sequelize,
      modelName: "postCategory",
    }
  );
  return PostCategory;
};
