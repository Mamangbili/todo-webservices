// import cors from 'cors'
const jwt = require( 'jsonwebtoken')
const express = require( 'express')
const bodyParser = require('body-parser')
const authorization = require('./router/middleware/authorization')

const loginRouter = require('./router/login')
const todosRouter = require('./router/todos')
const registerRouter = require('./router/register')

const app = express()
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(registerRouter)
app.use(loginRouter)
app.use(authorization,todosRouter)
app.use('/*', (req,res)=>res.status(404).send({message:"Resource Not found"}))

app.listen(3000,()=>{
    console.log('server started')
})
