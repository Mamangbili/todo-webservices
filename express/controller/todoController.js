const jwt = require('jsonwebtoken');
const sequelize = require('../sequelize-instance');
const { DataTypes } = require('sequelize');
require('dotenv').config();

const Todos = require('../../models/todos')(sequelize, DataTypes);

const updateTodo = async (id, todo, description, userId) => await Todos.update(
    { todo, description },
    {
        where: { id: id, user_id: userId }
    });
const deleteTodo = async (id, userId) => await Todos.destroy({ where: { id: id, user_id: userId } });
const createTodo = async (todo, description, user_id) => await Todos.create({ todo, description, user_id });
const getTodos = async (userId) => await Todos.findAll({ where: { user_id: userId } });
const detailTodo = async (todoId, userId) => await Todos.findOne({ where: { id: todoId, user_id: userId }, attributes: ["description", 'todo', "id"] });
const deleteAllTodo = async (userId) => await Todos.destroy({ where: { user_id: userId } });
const deleteManyTodo = async (idList, userId) => {
    let result = 0
    try {
        const transaction = await sequelize.transaction()
        result = await Todos.destroy({ where: { id: [...idList], user_id: userId }, transaction });

        if (result !== idList.length) {
            await transaction.rollback();
            console.log('Transaction rolled back');
        } else {
            await transaction.commit();
            console.log('Transaction committed');
        }
    } catch (e) {
        console.error(e);
        await transaction.rollback();
    }
    finally {
        return result
    }

}
class TodoController {

    async getAllFromUser(req, res, next) {
        try {
            const userId = jwt.verify(req.headers.authorization, process.env.TOKEN_SALT)['user_id'];
            const todos = await getTodos(userId);
            console.log(todos);
            res.status(200).send(todos);
        }
        catch (e) {
            res.status(403).send({ message: e.message });
        }
    }
    async update(req, res, next) {
        try {
            const userId = jwt.verify(req.headers.authorization, process.env.TOKEN_SALT)['user_id'];
            const todoId = req.params.todoId
            const result = await updateTodo(todoId, req.body.todo, req.body.description, userId);
            if (!result[0]) return res.status(404).send({ message: "Resource not found" });
            res.status(203).send({ message: "Update todo successful" });
        } catch (e) {

            res.status(401).send({ message: e.message });
        }
    }

    async deleteOne(req, res, next) {
        try {
            const userId = jwt.verify(req.headers.authorization, process.env.TOKEN_SALT)['user_id'];
            const todoId = req.params.todoId
            const result = await deleteTodo(todoId, userId);

            if (!result) return res.status(404).send({ message: "Resource not found" });

            res.status(203).send({ message: "Delete todo successful" });
        } catch (e) {
            res.status(401).send({ message: e.message });
        }
    }
    async deleteMany(req, res, next) {
        try {
            console.log(req.body)
            const userId = jwt.verify(req.headers.authorization, process.env.TOKEN_SALT)['user_id'];
            const idList = req.body.idList
            const result = await deleteManyTodo(idList, userId);
            console.log('result',result)
            if (result !== idList.length) return res.status(404).send({ message: "Some todo not found" })

            res.status(203).send({ message: "Delete todo successful" });
        } catch (e) {
            res.status(401).send({ message: e.message });
        }
    }

    async create(req, res, next) {
        try {
            const userId = jwt.verify(req.headers.authorization, process.env.TOKEN_SALT)['user_id'];
            await createTodo(req.body.todo, req.body.description, userId);
            res.status(203).send({ message: "Create todo successful" });
        } catch (e) {
            res.status(401).send({ message: e.message });
        }
    }

    async detail(req, res, next) {
        try {
            const userId = jwt.verify(req.headers.authorization, process.env.TOKEN_SALT)['user_id'];
            const todoId = req.params.todoId
            const todoDetail = await detailTodo(todoId, userId);
            res.status(200).send({ todoDetail });
        } catch (e) {
            res.status(403).send({ message: e.message });
        }
    }

    async deleteAll(req, res, next) {
        try {
            const userId = jwt.verify(req.headers.authorization, process.env.TOKEN_SALT)['user_id'];
            const result = await deleteAllTodo(userId);
            if (!result) res.status(404).send({ message: "Nothing to delete" })
            res.status(203).send({ message: "All todo has been deleted" });
        } catch (e) {
            res.status(401).send({ message: e.message });
        }
    }

}
const todoController = new TodoController();
exports.todoController = todoController;
