const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const { STRING, TEXT } = DataTypes

module.exports = sequelize => {
    class User extends Model { }
    User.init(
        {
            email: {
                type: STRING,
                allowNull: false,
            },
            nickname: {
                type: STRING,
                allowNull: false,
            },
            name: {
                type: STRING,
                allowNull: false,
            },
            password: {
                type: TEXT,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: 'user',
            hooks: {
                beforeCreate: user => {
                    user.password = bcrypt.hashSync(user.password, 11)
                }
            }
        }
    )
    return User
}
