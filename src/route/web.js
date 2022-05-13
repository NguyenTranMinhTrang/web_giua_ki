import express from "express";
import homeController from "../controllers/homeController";
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

    router.get("/delete-crud", userController.removeUser);
    router.post("/put-user", userController.putUser);
    router.get("/edit-crud", userController.getEditPage);
    router.get("/get-user", userController.getUser);
    router.post("/post-user", userController.postUser);
    router.get("/getPost", userController.getPost);
    router.get("/", homeController.getHomePage);

    return app.use('/', router);
}

module.exports = initWebRoutes;