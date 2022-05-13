import db from "../models/index";

let getTodos = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let todos = await db.Todo.findAll({
                where: { idUser: id },
                raw: true
            })

            if (todos) {
                data.errorCode = 1;
                data.message = "OK";
                data.todoList = todos;
            }
            else {
                data.errorCode = 0;
                data.message = "Not found any toto";
                data.todoList = {};
            }

            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

const createTodo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { idUser } = data;
            let user = await db.User.findOne({
                where: { id: idUser }
            });
            if (user) {
                await db.Todo.create({
                    idUser: data.idUser,
                    content: data.content,
                    date: data.date,
                });

                resolve({
                    errorCode: 1,
                    message: "Create new todo success!"
                });
            }

            else {
                resolve({
                    errorCode: 0,
                    message: "User not found!"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

const editTodo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let todo = await db.Todo.findOne({
                where: { idUser: data.idUser, id: data.id }
            })

            if (todo) {
                await db.Todo.update({
                    content: data.content,
                    date: data.date,
                }, {
                    where: { idUser: data.idUser, id: data.id }
                })

                resolve({
                    errorCode: 1,
                    message: "Todo is updated!",
                });
            }
            else {
                resolve({
                    errorCode: 0,
                    message: "Todo not found!"
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

const removeTodo = (idUser, id) => {
    return new Promise(async (resolve, reject) => {
        try {

            let todo = await db.Todo.findOne({
                where: { idUser: idUser, id: id }
            })

            if (todo) {
                await db.Todo.destroy({
                    where: { idUser: idUser, id: id }
                });

                resolve({
                    errorCode: 1,
                    message: "Todo is delete!",
                });
            }
            else {
                resolve({
                    errorCode: 0,
                    message: "Todo not found!"
                });
            }

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getTodos: getTodos,
    createTodo: createTodo,
    editTodo: editTodo,
    removeTodo: removeTodo
}