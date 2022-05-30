import userServices from "../services/userServices";


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
    login: login,
    getUsers: getUsers,
    createUser: createUser,
    editUser: editUser,
    deleteUser: deleteUser
}