'use strict'

import pool from './pool';
import env from '../config/env';


pool.on('connect', () => {
    console.log(`connection to booklibrary successful`)
});


const createUser = () => {
    const userQuery: string = `
        CREATE TABLE IF NOT EXISTS ${env.dbName} (
        uid SERIAL PRIMARY KEY, 
        firstname VARCHAR(50) NOT NULL, 
        lastname VARCHAR(50) NOT NULL, 
        middlename VARCHAR(50),
        email VARCHAR(150) NOT NULL UNIQUE,
        username VARCHAR(50) NOT NULL UNIQUE, 
        password VARCHAR(150) NOT NULL, 
        gender VARCHAR(20), 
        created_on DATE NOT NULL, 
        updated_on DATE, 
        last_login DATE
        )`

    pool.query(userQuery)
        .then((res: any) => {
            res;
        })
        .catch((e: any) => {
            console.log(e);
            // pool.end();
        })
}

const createBook = () => {
    const bookQuery = `
    CREATE TABLE IF NOT EXISTS ${env.dbName_book}(
    bid SERIAL PRIMARY KEY,
    user_id INT REFERENCES ${env.dbName}(uid) ON DELETE CASCADE, 
    title VARCHAR(500) NOT NULL, 
    author VARCHAR REFERENCES ${env.dbName}(username) ON DELETE CASCADE,
    content VARCHAR(800) NOT NULL,
    like_user_id INT[] DEFAULT ARRAY[]::INT[], 
    likes INT DEFAULT 0, 
    dislikes INT DEFAULT 0, 
    created_on DATE NOT NULL,
    updated_on DATE
    )`


    pool.query(bookQuery)
        .then((res: any) => {
            res;
        })
        .catch((e: any) => {
            console.log(e);
            // pool.end();
        })
}

const createComment = () => {
    const commentQuery = `
    CREATE TABLE IF NOT EXISTS ${env.dbName_comment} (
    cid SERIAL PRIMARY KEY,
    user_id INT REFERENCES ${env.dbName}(uid) ON DELETE CASCADE, 
    book_id INT REFERENCES ${env.dbName_book}(bid) ON DELETE CASCADE,
    commenter VARCHAR REFERENCES ${env.dbName}(username) ON DELETE CASCADE,
    content VARCHAR(500) NOT NULL,
    likes INT DEFAULT 0, 
    dislikes INT DEFAULT 0,
    created_at DATE NOT NULL,
    updated_at DATE
    )`

    pool.query(commentQuery)
        .then((res: any) => {
            res;
        })
        .catch((e: any) => {
            console.log(e);
            // pool.end()
        })
}


// Drop all tables
const dropUser = () => {
    const employQuery = `DROP TABLE IF EXISTS ${env.dbName} CASCADE`

    pool.query(employQuery)
        .then((res: any) => {
            res;
        })
        .catch((e: any) => {
            console.log(e);
            // pool.end();
        })
}

const dropBook = () => {
    const articleQuery = `DROP TABLE IF EXISTS ${env.dbName_book} CASCADE`
    pool.query(articleQuery)
        .then((res: any) => {
            res;
        })
        .catch((e: any) => {
            console.log(e);
            // pool.end();
        })
}

const dropComment = () => {
    const commentQuery = `DROP TABLE IF EXISTS ${env.dbName_comment} CASCADE`

    pool.query(commentQuery)
        .then((res: any) => {
            res;
        })
        .catch((e: any) => {
            console.log(e);
            // pool.end()
        })
}

const createAllTables = async () => {
    createUser();
    console.log('user table created')

    setTimeout(() => {
    createBook();
    createComment();
    console.log('all tables created')
    }, 6000)
}

const dropAllTables = () => {
    dropBook();
    dropComment();
    console.log('waiting to be deleted')
    dropUser();
    console.log('deleted')
}

export {
    createAllTables,
    dropAllTables
}

