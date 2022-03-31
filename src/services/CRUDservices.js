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

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser
}