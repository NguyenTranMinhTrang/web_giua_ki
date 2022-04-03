import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
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