const Sequelize = require('sequelize');
const { User } = require('../database/database');
const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const { nickname, name, password } = req.body

        try {
            //////////////////////////////////////////////////////////

            const isNicknameExist = await User.findOne({
                where: { nickname },
                attributes: { exclude: ['password'] }
            });

            if (!!isNicknameExist) {
                return res.json({
                    status: `failure`,
                    msg: `Use diffrent nickname. ${nickname} exist.`,
                });
            }

            //////////////////////////////////////////////////////////
        } catch (error) {
            throw error;
        }

        try {

            const addUser = await User.create({
                nickname,
                name,
                password,
            })

            res.json({
                status: `succes`,
                msg: `success register user ${nickname}`,
            });
        } catch (error) {
            throw error;
        }

    },

    login: async (req, res) => {
        const { nickname, password } = req.body

        try {

            const doesNicknameExist = await User.findOne({
                where: { nickname },
            });

            // const doesNicknameHaveCorrectPassword = (doesNicknameExist) => 
            // !!doesNicknameExist ? bcrypt.compareSync(password, doesNicknameExist.dataValues.password) : false;

            if (!!doesNicknameExist && bcrypt.compareSync(password, doesNicknameExist.dataValues.password)) {
                res.json({
                    status: 'success',
                    msg: `${nickname}! Welcome in our app.`,
                });
            } else {
                res.json({
                    status: 'failure',
                    msg: 'Wrong nickname or password',
                });
            }

        } catch (error) {
            throw error;
        }
    },

}