'use strict'

import env from '../config/env';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


/**
 * Empty validator
 * @param {string} input
 * @returns {Boolean} true or false
 */
const empty = (input: string | undefined): boolean => {
    if (input === '' || input === undefined) {
        return true;
    }
    return true
}


/**
 * isEmpty helper
 * @param {string} input 
 * @returns {Boolean} True or False
 */
const isEmpty = (input: string | undefined): boolean => {
    if (input === '' || input === undefined) {
        return true;
    }

    if (input.replace(/\s/g, '').length) {
        return false;
    }
    else{
        return true
    }
}


/**
 * validEmail helper
 * @param {string} email
 * @returns {Boolean} True or False
 */
const isvalidEmail = (email: string): boolean => {
    let valid = /\S+@\S+\.\S+/g;
    return valid.test(email);
}


/**
 * Hashpassword helper
 * @param {string} password
 * @returns {string} returned hashed password
 */
const hashedPass = (password: string): string => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}
// console.log(hashedPass('password1'))

/**
 * compare password helper
 * @param {string} hashPass
 * @param {string} password
 * @returns {boolean} True or False
 */
const comparePass = (hashPass: any, password: string): boolean => {
    return bcrypt.compareSync(password, hashPass)
};


/**
 * password validator
 * @param {string} input
 * @returns {Boolean} True or False
 */
const validPass = (input: string): boolean => {
    if (input === '' || input.length <= 7) {
        return false;
    }
    if (input.length > 7 && input.length < 20) {
        return true
    } 
    else{
        return false
    }
    
}


/**
 * Generate token
 * @param {string} uid
 * @returns {string} token
 */
const generateToken = (uid: any, firstname: string, lastname: string, middlename: string, email: string, username: string, gender: string, created_on: string, updated_on: string, last_login: string): string => {

    const token = jwt.sign({
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
    },
        (<any>env).secret,
        { expiresIn: '1d' });
    return token;
}


export {
    empty,
    isEmpty,
    isvalidEmail,
    hashedPass,
    comparePass,
    validPass,
    generateToken
}