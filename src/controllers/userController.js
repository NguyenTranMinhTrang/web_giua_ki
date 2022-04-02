import db from '../models/index';
import CRUDservices from "../services/CRUDservices";

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

module.exports = {
    getPost: getPost,
    postUser: postUser,
    getUser: getUser,
    getEditPage: getEditPage,
    putUser: putUser
}