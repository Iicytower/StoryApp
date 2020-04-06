const Sequelize = require('sequelize');
const { Post } = require('../database/database');

module.exports = {
    add: async (req, res) => {
        console.log(req.user);

        try {
            console.log("addPost");
            // const addPost = await Post.create({
                
            // });
        } catch (err) {
            throw err;
        }

        await res.json({status: "success"});
    }
}