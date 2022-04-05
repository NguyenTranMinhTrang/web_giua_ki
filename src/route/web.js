import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {

    router.put("/api/editUser", userController.editUser);
    router.post("/api/createUser", userController.createUser);
    router.get("/api/getUsers", userController.getUsers);
    router.post("/api/login", userController.login);

    router.get("/delete-crud", userController.deleteUser);
    router.post("/put-user", userController.putUser);
    router.get("/edit-crud", userController.getEditPage);
    router.get("/get-user", userController.getUser);
    router.post("/post-user", userController.postUser);
    router.get("/getPost", userController.getPost);
    router.get("/", homeController.getHomePage);

    return app.use('/', router);
}

module.exports = initWebRoutes;