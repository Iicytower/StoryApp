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
  show: async (req, res) => {
    //TODO need to do filters

    /*
      {
        "postId": 34, 
        "ownerId": true, //require. is user search his own posts? if false user search in global searcher, if true only his own posts.
        "title": "example title",
        "category": {
          "fantasy": true,
          "romantic": false,
          "drama": false,
          "novel": false
        }
      }
    */

    //this is global searcher. for search owner posts will be second endpoint and for search posts from specific user will be third engine

    const { postId, ownerId, title, language, public, category } = req.body;

    let responseObj = {};
    try {
      if (!!postId) {

        const findPost = await Posts.findAll({
          include: [PostCategory],
          where: { 
            id: postId, 
            public: true,
          },
        });

          responseObj = findPost;
          if (!findPost)
          return res.status(404).json({
            status: "failure",
            msg: "There is no posts meeting the requirements",
          });
      }
      res.status(200).json(responseObj);
    } catch (err) {
      throw err;
    }
  },
};
