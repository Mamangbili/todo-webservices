const sequelize = require('../../sequelize-instance')
const { DataTypes } = require('sequelize')
const Users = require('../../../models/users')(sequelize, DataTypes)
const hash = require('../../../utils/hash')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    let user = null
    if (!req.headers.authorization) {
        user = await Users.findOne({
            where: {
                username: hash(req.body.username),
                password: hash(req.body.password)
            }
        });
        console.log(user)
        if (!user) return res.status(401).send({ message: "Account not found" });
        req.headers.authorization = jwt.sign({ username: user.username, password: user.password, user_id: user.id }, process.env.TOKEN_SALT, { expiresIn: '7 days' });
    }

    next();
};
