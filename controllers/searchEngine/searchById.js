const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { Posts, PostCategory } = require("../../database/database");

module.exports = {
  idSearcher: async (req, res) => {
    try {
      //TODO check is all posts exist
      const { postId } = req.body;
      if (!!postId) {
        const findPost = await Posts.findAll({
          include: [PostCategory],
          where: {
            id: postId,
            public: true,
          },
        });
        if (!findPost)
          return res.status(404).json({
            status: "failure",
            msg: "There is no posts meeting the requirements",
          });
        res.status(200).json(findPost);
      } else {
        res.status(200).json({
          status: "failure",
          msg: "Wrong field name.",
        });
      }
    } catch (err) {
      throw err;
    }
  },
};
