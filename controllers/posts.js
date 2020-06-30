const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { User, Posts, PostCategory } = require("../database/database");
module.exports = {
  add: async (req, res) => {
    //TODO validate data and support errors https://sequelize.org/master/manual/transactions.html
    const { title, description, language, public, category } = req.body;
    const id = req.user.id;
    try {
      const currentUser = await User.findOne({
        where: { id },
      });
      const addPost = await currentUser.createPost({
        title,
        description,
        language,
        public,
      });
      const addPostCategory = await addPost.createPostCategory(category);
      return res.status(200).json({
        status: "success",
        msg: "We add post into database",
      });
    } catch (err) {
      throw err;
    }
  },
  remove: async (req, res) => {
    //TODO validate data
    const { postsId } = req.body;
    let nonExistentPosts = [];
    try {
      for (let i = 0; i < postsId.length; i++) {
        const id = postsId[i];

        const doesPostExist = await Posts.findOne({
          where: {
            id,
            userId: req.user.id,
          },
        });
        const doesPostCategoryExist = await PostCategory.findOne({
          where: {
            postId: id,
          },
        });
        if (!doesPostExist || !doesPostCategoryExist) nonExistentPosts.push(id);
      }
    } catch (err) {
      throw err;
    }

    try {
      if (nonExistentPosts.length === 0) {
        postsId.forEach(async (id) => {
          const removePostCategory = await PostCategory.destroy({
            where: {
              postId: id,
            },
          });
          const removePost = await Posts.destroy({
            where: {
              id,
              userId: req.user.id,
            },
          });
        });
      } else {
        return res.status(404).json({
          status: "failure",
          msg: "Post doesn't exist",
          nonExistentPosts,
        });
      }

      return res.status(200).json({
        status: "succes",
        msg: "We remove posts from database",
        postsId,
      });
    } catch (err) {
      throw err;
    }
  },
};
