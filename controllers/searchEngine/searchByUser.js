const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { User, Posts, PostCategory } = require("../../database/database");


module.exports = {
    userSearcher: async (req, res) => {
        res.end('user searcher');
    }
}