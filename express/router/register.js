const registerRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const sequelize = require('../sequelize-instance')
const { DataTypes } = require('sequelize')
const Users = require('../../models/users')(sequelize,DataTypes)
const hash = require('../../utils/hash')
require('dotenv').config()

registerRouter.post('/register'
    , async (req, res, next) => {
        try {
            const user = await Users.create({
                username: req.body.username,
                password: req.body.password
            })
            console.log(user)
            const newToken = jwt.sign({ username: user.username, password: user.password, user_id: user.id }, process.env.TOKEN_SALT, { expiresIn: "7 days" })

            res.status(200).send({ message: "Create user successful", token: newToken })
            next()
        } catch (e) {
            console.log(e.message)
            res.status(403).send({ message: "Failed to create user" })
        }
    }
)

module.exports = registerRouter