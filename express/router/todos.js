
const todoRouter = require('express').Router()
const { todoController } = require('../controller/todoController');


todoRouter.get('/todos/:todoId', todoController.detail)
todoRouter.get('/todos', todoController.getAllFromUser)
todoRouter.post('/todos', todoController.create)
todoRouter.delete('/todos/delete-many', todoController.deleteMany)
todoRouter.put('/todos/:todoId', todoController.update)
todoRouter.delete('/todos/:todoId', todoController.deleteOne)
todoRouter.delete('/todos', todoController.deleteAll)
// todoRouter.use('/todos', (req, res) => res.status(404).send({ message: "Resource Not found" }))

module.exports = todoRouter
