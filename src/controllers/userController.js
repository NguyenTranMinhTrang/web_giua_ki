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

module.exports = {
    getPost: getPost,
    postUser: postUser,
    getUser: getUser,
}