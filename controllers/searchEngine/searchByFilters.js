const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { User, Posts, PostCategory } = require("../../database/database");


module.exports = {
    filterSearcher: async (req, res) => {
        res.end('filer searcher');

        try {
            const { title, language, category } = req.body;
      
            if (title != undefined ) {
              const findPost = await Posts.findAll({
                include: [PostCategory],
                where: {
                  title,
                  public: true,
                },
              });
            }
            res.end('good');
          } catch (err) {
            throw err;
          }
    }
}