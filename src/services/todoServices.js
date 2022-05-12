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

module.exports = {
    getTodos: getTodos
}