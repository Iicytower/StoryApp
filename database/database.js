const Sequelize = require('sequelize');

const { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST } = process.env;

const connection = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: 'mysql',
    logging: false
});

const User = connection.import('./models/User');
const Posts = connection.import('./models/Posts');
const PostCategory = connection.import('./models/PostCategory');

Posts.User = Posts.belongsTo(User);
User.Posts = User.hasMany(Posts); 

PostCategory.Posts = PostCategory.belongsTo(Posts); 
Posts.PostCategory = Posts.hasOne(PostCategory); 

const initializeDatabaseConnection = async () => {
    try {
        // await connection.sync({force: true});
        await connection.sync({alter: true});
        // await connection.sync();
        console.log('The database connection has been successfully established!')
        
    } catch (err) {
        console.log({
            error,
            message: 'There was a problem connecting to the database!',
        });
        throw err;
    }

}
initializeDatabaseConnection();

module.exports = { User, Posts, PostCategory };
