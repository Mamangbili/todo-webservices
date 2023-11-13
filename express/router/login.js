
const loginRouter = require('express').Router()

const authenticate = require('./middleware/authenticate.js')
const authorization = require('./middleware/authorization.js')

loginRouter.post('/login', authenticate, authorization, (req, res) => {
    res.status(200).send({ token: req.headers.authorization })
})

loginRouter.use('/login*', (req,res)=>res.status(404).send({message:"Resource Not found"}))
module.exports = loginRouter