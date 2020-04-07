const Sequelize = require('sequelize');
const { User } = require('../database/database');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

module.exports = {
    register: async (req, res) => {
        const { email, nickname, name, password } = req.body

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
                email,
                nickname,
                name,
                password,
            });

            res.json({
                status: `succes`,
                msg: `success register user ${nickname}`,
            });
        } catch (error) {
            throw error;
        }

    },

    login: async (req, res) => {
        const { nickname, password } = req.body;
        try {

            const doesNicknameExist = await User.findOne({
                where: { nickname },
            });

            if (!!doesNicknameExist && bcrypt.compareSync(password, doesNicknameExist.dataValues.password)) {

                const token = jwt.sign({ nickname, role: 'user' }, process.env.JWT_KEY);
                res.cookie('token', token, {
                    secure: process.env.NODE_ENV === 'production',
                    httpOnly: true,
                    sameSite: true,
                    maxAge: 1000 * 60 * 60 * 3,
                }).json({
                    status: 'success',
                    msg: `${nickname}! Welcome in our app.`,
                })

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