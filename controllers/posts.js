const Sequelize = require('sequelize');
const { Post } = require('../database/database');

module.exports = {
    add: async (req, res) => {
        console.log(req.body);
        await res.json({status: "success"});
    }
}