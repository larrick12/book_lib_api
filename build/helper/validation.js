'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.validPass = exports.comparePass = exports.hashedPass = exports.isvalidEmail = exports.isEmpty = exports.empty = void 0;
const env_1 = __importDefault(require("../config/env"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * Empty validator
 * @param {string} input
 * @returns {Boolean} true or false
 */
const empty = (input) => {
    if (input === '' || input === undefined) {
        return true;
    }
    return true;
};
exports.empty = empty;
/**
 * isEmpty helper
 * @param {string} input
 * @returns {Boolean} True or False
 */
const isEmpty = (input) => {
    if (input === '' || input === undefined) {
        return true;
    }
    if (input.replace(/\s/g, '').length) {
        return false;
    }
    else {
        return true;
    }
};
exports.isEmpty = isEmpty;
/**
 * validEmail helper
 * @param {string} email
 * @returns {Boolean} True or False
 */
const isvalidEmail = (email) => {
    let valid = /\S+@\S+\.\S+/g;
    return valid.test(email);
};
exports.isvalidEmail = isvalidEmail;
/**
 * Hashpassword helper
 * @param {string} password
 * @returns {string} returned hashed password
 */
const hashedPass = (password) => {
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hash = bcryptjs_1.default.hashSync(password, salt);
    return hash;
};
exports.hashedPass = hashedPass;
// console.log(hashedPass('password1'))
/**
 * compare password helper
 * @param {string} hashPass
 * @param {string} password
 * @returns {boolean} True or False
 */
const comparePass = (hashPass, password) => {
    return bcryptjs_1.default.compareSync(password, hashPass);
};
exports.comparePass = comparePass;
/**
 * password validator
 * @param {string} input
 * @returns {Boolean} True or False
 */
const validPass = (input) => {
    if (input === '' || input.length <= 7) {
        return false;
    }
    if (input.length > 7 && input.length < 20) {
        return true;
    }
    else {
        return false;
    }
};
exports.validPass = validPass;
/**
 * Generate token
 * @param {string} uid
 * @returns {string} token
 */
const generateToken = (uid, firstname, lastname, middlename, email, username, gender, created_on, updated_on, last_login) => {
    const token = jsonwebtoken_1.default.sign({
        uid,
        firstname,
        lastname,
        middlename,
        email,
        username,
        gender,
        created_on,
        updated_on,
        last_login
    }, env_1.default.secret, { expiresIn: '1d' });
    return token;
};
exports.generateToken = generateToken;
//# sourceMappingURL=validation.js.map