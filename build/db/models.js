'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropAllTables = exports.createAllTables = void 0;
const pool_1 = __importDefault(require("./pool"));
const env_1 = __importDefault(require("../config/env"));
pool_1.default.on('connect', () => {
    console.log(`connection to booklibrary successful`);
});
const createUser = () => {
    const userQuery = `
        CREATE TABLE IF NOT EXISTS ${env_1.default.dbName} (
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
        )`;
    pool_1.default.query(userQuery)
        .then((res) => {
        res;
    })
        .catch((e) => {
        console.log(e);
        // pool.end();
    });
};
const createBook = () => {
    const bookQuery = `
    CREATE TABLE IF NOT EXISTS ${env_1.default.dbName_book}(
    bid SERIAL PRIMARY KEY,
    user_id INT REFERENCES ${env_1.default.dbName}(uid) ON DELETE CASCADE, 
    title VARCHAR(500) NOT NULL, 
    author VARCHAR REFERENCES ${env_1.default.dbName}(username) ON DELETE CASCADE,
    content VARCHAR(800) NOT NULL,
    like_user_id INT[] DEFAULT ARRAY[]::INT[], 
    likes INT DEFAULT 0, 
    dislikes INT DEFAULT 0, 
    created_on DATE NOT NULL,
    updated_on DATE
    )`;
    pool_1.default.query(bookQuery)
        .then((res) => {
        res;
    })
        .catch((e) => {
        console.log(e);
        // pool.end();
    });
};
const createComment = () => {
    const commentQuery = `
    CREATE TABLE IF NOT EXISTS ${env_1.default.dbName_comment} (
    cid SERIAL PRIMARY KEY,
    user_id INT REFERENCES ${env_1.default.dbName}(uid) ON DELETE CASCADE, 
    book_id INT REFERENCES ${env_1.default.dbName_book}(bid) ON DELETE CASCADE,
    commenter VARCHAR REFERENCES ${env_1.default.dbName}(username) ON DELETE CASCADE,
    content VARCHAR(500) NOT NULL,
    likes INT DEFAULT 0, 
    dislikes INT DEFAULT 0,
    created_at DATE NOT NULL,
    updated_at DATE
    )`;
    pool_1.default.query(commentQuery)
        .then((res) => {
        res;
    })
        .catch((e) => {
        console.log(e);
        // pool.end()
    });
};
// Drop all tables
const dropUser = () => {
    const employQuery = `DROP TABLE IF EXISTS ${env_1.default.dbName} CASCADE`;
    pool_1.default.query(employQuery)
        .then((res) => {
        res;
    })
        .catch((e) => {
        console.log(e);
        // pool.end();
    });
};
const dropBook = () => {
    const articleQuery = `DROP TABLE IF EXISTS ${env_1.default.dbName_book} CASCADE`;
    pool_1.default.query(articleQuery)
        .then((res) => {
        res;
    })
        .catch((e) => {
        console.log(e);
        // pool.end();
    });
};
const dropComment = () => {
    const commentQuery = `DROP TABLE IF EXISTS ${env_1.default.dbName_comment} CASCADE`;
    pool_1.default.query(commentQuery)
        .then((res) => {
        res;
    })
        .catch((e) => {
        console.log(e);
        // pool.end()
    });
};
const createAllTables = () => __awaiter(void 0, void 0, void 0, function* () {
    createUser();
    console.log('user table created');
    setTimeout(() => {
        createBook();
        createComment();
        console.log('all tables created');
    }, 6000);
});
exports.createAllTables = createAllTables;
const dropAllTables = () => {
    dropBook();
    dropComment();
    console.log('waiting to be deleted');
    dropUser();
    console.log('deleted');
};
exports.dropAllTables = dropAllTables;
//# sourceMappingURL=models.js.map