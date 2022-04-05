import db from '../models/index';
import CRUDservices from "../services/CRUDservices";
import userServices from "../services/userServices";

/* [GET /getPost] form post user */
let getPost = (req, res) => {
    return res.render("postuser.ejs");
}

/* [POST /post-user] create new user */

let postUser = async (req, res) => {
    let message = await CRUDservices.createNewUser(req.body);
    console.log(message);
    return res.send("Sucess");
}

/* [GET /get-user]  get user data */
let getUser = async (req, res) => {
    let users = await CRUDservices.getAllUser();
    return res.render("displayuser.ejs", {
        userData: users
    });
}
/* [GET /edit-crud]  get edit user page*/
let getEditPage = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDservices.getUserInfoById(userId);
        if (userData) {
            return res.render("editUserInfo.ejs", {
                user: userData
            });
        }
        return res.send("User not found!");
    }
    else {
        return res.send("User not found!");
    }
}

/* [PUT /put-user]  put user data */
let putUser = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDservices.updateUserData(data);
    return res.render("displayuser.ejs", {
        userData: allUsers
    });
}

/* [POST /delete-crud]  get delete user page*/
let removeUser = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDservices.deleteUserById(id);
        return res.send("Delete User Success");
    }
    return res.send("User not found!");
}

/* [POST /api/login]  login user */
let login = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(500).json({
            errorCode: 0,
            message: "Missing inputs paramaters!"
        })
    }

    let userData = await userServices.handleUserLogin(email, password);

    return res.status(200).json({
        errorCode: userData.errorCode,
        message: userData.errMessage,
        userData: userData.user ? userData.user : {}
    });
}

/* [GET /api/getUsers]  get user data */
let getUsers = async (req, res) => {

    let id = req.query.id;
    let users = await userServices.getAllUser(id);
    if (users) {
        return res.status(200).json({
            errorCode: 1,
            message: "OK",
            users
        })
    }
    else {
        return res.status(500).json({
            errorCode: 0,
            message: "User's not found!",
            users
        })
    }

}

/* [POST /api/createUser]  create new user data */
let createUser = async (req, res) => {
    let user = req.body;
    if (user) {
        let postUser = await userServices.postNewUser(user);
        return res.status(200).json(postUser);
    }

    else {
        return res.status(500).json({
            errorCode: 0,
            message: "Create user failed!"
        })
    }

}


/* [PUT /api/editUser]  edit user data */
let editUser = async (req, res) => {
    let data = req.body;
    if (data) {
        let message = await userServices.updateUserData(data);
        return res.status(200).json(message);
    }
    else {
        return res.status(500).json({
            errorCode: 0,
            message: "Missing required parameters!"
        })
    }
}

/* [DELETE /api/deleteUser]  delete user data */
let deleteUser = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let message = await userServices.deleteUser(id);
        return res.status(200).json(message);
    }
    else {
        return res.status(500).json({
            errorCode: 0,
            message: "Missing required parameters!"
        })
    }
}

module.exports = {
    getPost: getPost,
    postUser: postUser,
    getUser: getUser,
    getEditPage: getEditPage,
    putUser: putUser,
    removeUser: removeUser,
    login: login,
    getUsers: getUsers,
    createUser: createUser,
    editUser: editUser,
    deleteUser: deleteUser
}