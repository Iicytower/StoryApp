const Sequelize = require('sequelize');

const { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST } = process.env;

const connection = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: 'mysql',
    logging: false
});

const User = connection.import('./models/User');
const Posts = connection.import('./models/Posts');

User.hasMany(Posts);
Posts.belongsTo(User);

const initializeDatabaseConnection = async () => {
    try {
        await connection.sync();
        console.log('The database connection has been successfully established!')

    } catch (error) {
        throw error;
    }

}
initializeDatabaseConnection();

module.exports = { User, Posts };
