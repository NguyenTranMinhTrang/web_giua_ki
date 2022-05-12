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

module.exports = {
    getAllTodo: getAllTodo
}
