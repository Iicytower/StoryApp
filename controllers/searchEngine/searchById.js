const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { Posts, PostCategory } = require("../../database/database");

module.exports = {
  idSearcher: async (req, res) => {
    try {
      const { postsId } = req.body;
      if (!!postsId) {
        const findPost = await Posts.findAll({
          include: [PostCategory],
          where: {
            id: postsId,
            public: true,
          },
        });
        if (findPost.length != postsId.length) {
          if (findPost.length == 0) {
            return res.status(404).json({
              status: "failure",
              msg: "There is no posts meeting the requirements",
            });
          } else {
            const findedPosts = findPost.reduce((acc, cur) => {
              acc.push(cur.dataValues.id);
              return acc;
            }, []);

            return res.status(601).json({ //custom status 601: "found some data you are asking about"
              status: "failure",
              msg: "Some records do not exist",
              finded: findedPosts,
            });
          }
        }

        res.status(200).json(findPost);
      } else {
        res.status(200).json({
          status: "failure",
          msg: "Wrong field name or data type.",
        });
      }
    } catch (err) {
      throw err;
    }
  },
};
