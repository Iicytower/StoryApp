const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { User, Posts, PostCategory } = require("../database/database");
module.exports = {
  add: async (req, res) => {
    //TODO validate data and support errors https://sequelize.org/master/manual/transactions.html
    const { title, description, language, category } = req.body;
    const id = req.user.id;
    try {
      const currentUser = await User.findOne({
        where: { id },
      });
      const addPost = await currentUser.createPost({
        title,
        description,
        language,
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
    const { idArr } = req.body;
    let isPostsExist = true;
    let nonExistentPosts = [];
    try {
      await idArr.forEach(async (id) => {

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
        console.log(!doesPostExist, !doesPostCategoryExist);
        if (!doesPostExist || !doesPostCategoryExist) nonExistentPosts.push(id);

      });
      console.log(nonExistentPosts);
    } catch (err) {
      throw err;
    }

    try {
      console.log(nonExistentPosts.length);
      if (nonExistentPosts.length > 0) {
        idArr.forEach(async (id) => {
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
          console.log(removePostCategory);
          console.log(removePost);
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
        "ownerId": true, //require
        "title": "example title",
        "category": {
          "fantasy": true,
          "romantic": false,
          "drama": false,
          "novel": false
        }
      }
    */

    const { postId, ownerId, title, category } = req.body;

    try {
      let responseObj;
      let status = 200;
      if (ownerId) {
        const findedPost = await Posts.findOne({
          where: {
            id: postId,
            userId: req.user.id,
          },
        });

        if (findedPost === null) {
          return res.status(404).json({
            status: "failure",
            msg: "Post doesn't exist",
          });
        }

        const findedPostCategory = await PostCategory.findOne({
          where: {
            postId: postId,
          },
        });

        responseObj = findedPost.dataValues;
        responseObj.category = findedPostCategory.dataValues;
      } else if (!!title) {
        //START HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const findPosts = Posts.findAll({
          where: {
            title,
          },
        });

        console.log(findPosts);
        return res.status(200).json(findPosts);
        responseObj = {};
      }
      return res.status(status).json(responseObj);

      // const showPosts = await Posts.findAll({
      //   where: searchObj,
      // });
    } catch (err) {
      throw err;
    }
  },
};
