import db from "../models/index";
import bcrypt from "bcrypt";
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    raw: true
                })

                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (!check) {
                        userData.errorCode = 3;
                        userData.errMessage = "Password is incorrect";
                    }
                    else {
                        userData.errorCode = 1;
                        userData.errMessage = "Login Success";
                        delete user.password;
                        userData.user = user;
                    }
                }
                else {
                    userData.errorCode = 2;
                    userData.errMessage = "User's not found";
                }
            }
            else {
                userData.errorCode = 0;
                userData.errMessage = "Your email isn't exist";
            }
            resolve(userData);

        } catch (error) {
            reject(error);
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email }
            })

            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }

        } catch (error) {
            reject(error);
        }
    })
}


let getAllUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = '';
            if (id === 'ALL') {
                user = await db.User.findAll({});
            }


            if (id && id !== 'ALL') {
                user = await db.User.findOne({
                    where: { id: id }
                });
            }

            resolve(user);

        } catch (error) {
            reject(error);
        }
    })
}

let postNewUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkEmail = await checkUserEmail(user.email);
            if (checkEmail) {
                resolve({
                    errorCode: 0,
                    message: "Your email is already exist!"
                })
            }
            else {
                let hashPasswordFromBcrypt = await hashPassword(user.password);
                await db.User.create({
                    username: user.username,
                    email: user.email,
                    password: hashPasswordFromBcrypt,
                })

                resolve({
                    errorCode: 1,
                    message: "Register success!"
                });
            }

        } catch (error) {
            reject(error)
        }
    })
}

let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (error) {
            reject(error);
        }
    })
}


let deleteUser = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            })


            if (!user) {
                resolve({
                    errorCode: 0,
                    message: "User not found!"
                })
            }

            await db.User.destroy({
                where: {
                    id: id
                }
            })
            resolve({
                errorCode: 1,
                message: "User is deleted"
            })

        } catch (error) {
            reject(error);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errorCode: 0,
                    message: "Missing required parameters"
                })
            }

            let user = await db.User.findOne({
                where: { id: data.id }
            })

            if (!user) {
                resolve({
                    errorCode: 0,
                    message: "User not found!"
                })
            }

            await db.User.update({
                username: data.username
            }, {
                where: { id: data.id }
            })


            resolve({
                errorCode: 1,
                message: "User is updated!"
            });

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUser: getAllUser,
    postNewUser: postNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData
}