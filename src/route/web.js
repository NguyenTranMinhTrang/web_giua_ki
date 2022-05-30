import express from "express";
import userController from "../controllers/userController";
import todoController from "../controllers/todoController";

let router = express.Router();

let initWebRoutes = (app) => {

    router.delete("/api/deleteTodo", todoController.deleteTodo);
    router.put("/api/editTodo", todoController.editTodo);
    router.post("/api/addTodo", todoController.addTodo);
    router.get("/api/getTodos", todoController.getAllTodo);
    router.post("/api/login", userController.login);
    router.delete("/api/deleteUser", userController.deleteUser);
    router.put("/api/editUser", userController.editUser);
    router.post("/api/createUser", userController.createUser);
    router.get("/api/getUsers", userController.getUsers);
    router.post("/api/login", userController.login);

    return app.use('/', router);
}

module.exports = initWebRoutes;