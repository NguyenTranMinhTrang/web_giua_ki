import bcrypt from "bcrypt";
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
import db from '../models/index';


let createNewUser = async (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashPassword(user.password);
            await db.User.create({
                username: user.username,
                email: user.email,
                password: hashPasswordFromBcrypt,
            })

            resolve('Create successfully a new user!');
        } catch (error) {

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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            });

            if (user) {
                resolve(user);
            }
            else {
                resolve({});
            }
        } catch (error) {
            reject(error);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await db.User.update({
                username: data.username
            }, {
                where: { id: data.id }
            })

            let allUsers = await db.User.findAll();
            resolve(allUsers);

        } catch (error) {
            reject(error);
        }
    })
}

let deleteUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            })

            if (user) {
                user.destroy();
            }

            resolve();

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}