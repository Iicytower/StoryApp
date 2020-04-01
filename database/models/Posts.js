const { Model, DataTypes } = require('sequelize');

const { STRING, TEXT } = DataTypes

module.exports = sequelize => {
    class Posts extends Model { }
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
            owner: {
                type:STRING,
                allowNull:false,
            },
        },
        {
            sequelize,
            modelName: 'posts',
        }
    )
    return Posts
}
