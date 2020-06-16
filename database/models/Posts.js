const { Model, DataTypes } = require("sequelize");

const { STRING, TEXT, BOOLEAN } = DataTypes;

module.exports = (sequelize) => {
  class Posts extends Model {}
  Posts.init(
    {
      title: {
        type: STRING,
        allowNull: false,
      },
      description: {
        type: TEXT,
        allowNull: false,
      },
      language: {
        type: STRING,
        allowNull: false,
      },
      visits: {
        type: STRING,
        allowNull: false,
        defaultValue: 0,
      },
      likes: {
        type: STRING,
        allowNull: false,
        defaultValue: 0,
      },
      public: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    },
    {
      sequelize,
      modelName: "posts",
    }
  );
  return Posts;
};
