const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { User, Posts, PostCategory } = require("../../database/database");

module.exports = {

    //TODO validate data and add error handling
    
  userSearcher: async (req, res) => {
    const { owner } = req.body;
    try {
      const findUser = await User.findAll({
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "email"],
        },
        where: {
          nickname: owner,
        },
      });
      return res.json(findUser);
    } catch (err) {
      throw err;
    }
  },
  userPostSearcher: async (req, res) => {
    const { userId } = req.body;

    try {
      const findUser = await User.findOne({
        where: { 
            id: userId,
        },
      });

      if (findUser) {
        const findPost = await Posts.findAll({
          include: [PostCategory],
          where: {
            userId,
            public: true,
          },
        });

        if(!!findPost){
            return res.status(404).json({
                status: "success",
                msg: "This user do not has any post added",
              });
        }

        return res.status(200).json(findPost);
      }else{
        return res.status(404).json({
            status: "success",
            msg: `User with id=${userId} do not exist.`,
          });
      }
      
    } catch (err) {
      throw err;
    }
  },
};
