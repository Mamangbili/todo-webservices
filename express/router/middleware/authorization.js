const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = (req, res, next) => {
    try {
        console.log('ini autho')
        console.log(req.headers.authorization)
        jwt.verify(req.headers.authorization, process.env.TOKEN_SALT)
        next()
    }
    catch (e) {
        res.status(401).send({ message: e.message })
    }
}