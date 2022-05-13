import todoServices from "../services/todoServices";

/* [GET /api/getTodos] get all todos by id */
const getAllTodo = async (req, res) => {
    let id = req.query.userId;
    let data = await todoServices.getTodos(id);
    if (data) {
        return res.status(200).json({
            errorCode: data.errorCode,
            message: data.message,
            data: data.todoList
        })
    }
    else {
        return res.status(500).json({
            errorCode: 0,
            message: "There is an error occurded",
        })
    }
}

/* [POST /api/addTodo] add todo by id */
const addTodo = async (req, res) => {
    let data = req.body;
    let response = await todoServices.createTodo(data);
    if (response) {
        return res.status(200).json({
            errorCode: response.errorCode,
            message: response.message,
        })
    }
    else {
        return res.status(500).json({
            errorCode: 0,
            message: "There is an error occurded",
        })
    }
}


/* [PUT /api/editTodo] edit todo by id */
const editTodo = async (req, res) => {
    const data = req.body;
    const response = await todoServices.editTodo(data);
    if (response) {
        return res.status(200).json({
            errorCode: response.errorCode,
            message: response.message,
            todoList: response.todoList
        });
    }
    else {
        return res.status(500).json({
            errorCode: 0,
            message: "There is an error occurded",
        });
    }
}

/* [DELETE /api/deleteTodo] delete todo by id */
const deleteTodo = async (req, res) => {
    let { idUser, id } = req.query;
    const response = await todoServices.removeTodo(idUser, id);
    if (response) {
        return res.status(200).json({
            errorCode: response.errorCode,
            message: response.message,
            todoList: response.todoList
        });
    }
    else {
        return res.status(500).json({
            errorCode: 0,
            message: "There is an error occurded",
        });
    }
}

module.exports = {
    getAllTodo: getAllTodo,
    addTodo: addTodo,
    editTodo: editTodo,
    deleteTodo: deleteTodo
}
