const Sequelize = require('sequelize');
const { Posts } = require('../database/database');

module.exports = {
    add: async (req, res) => {
        const { title, description } = req.body;
        try {
            const addPost = await Posts.create({
                title,
                description,
                owner: req.user.nickname,
            });
            return res.json({ status: "success" });
        } catch (err) {
            throw err;
        }

        // await res.json({ status: "success" });
    }
}