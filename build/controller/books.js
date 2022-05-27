"use strict";
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
const moment_1 = __importDefault(require("moment"));
const query_1 = __importDefault(require("../db/query"));
const status_1 = require("../helper/status");
const validation_1 = require("../helper/validation");
const book = (args, req) => __awaiter(void 0, void 0, void 0, function* () {
    let { title, content } = args;
    let user = req.user;
    if (!user || user === undefined) {
        status_1.errorMessage.message = "you're not authenticated please signin!";
        throw new Error(status_1.errorMessage.message);
    }
    const { username, uid, last_login } = user;
    if (!last_login || last_login == null) {
        status_1.errorMessage.message = "you're not authenticated please login!";
        throw new Error(status_1.errorMessage.message);
    }
    if ((0, validation_1.isEmpty)(title)) {
        status_1.errorMessage.message = "title cannot be empty";
        throw new Error(status_1.errorMessage.message);
    }
    if ((0, validation_1.isEmpty)(content)) {
        status_1.errorMessage.message = "content cannot be empty";
        throw new Error(status_1.errorMessage.message);
    }
    let created_on = (0, moment_1.default)(new Date());
    let author = username;
    let user_id = uid;
    let insquery = `INSERT INTO book(title, content, author, user_id, created_on) VALUES($1, $2, $3, $4, $5) returning *`;
    let fetch = `SELECT * FROM bookuser WHERE uid=${user_id}`;
    const values = [
        title,
        content,
        author,
        user_id,
        created_on
    ];
    try {
        let { rows } = yield (0, query_1.default)(fetch);
        let dbresp = rows[0];
        if (!dbresp === undefined) {
            status_1.errorMessage.message = "user not exit";
            throw new Error(status_1.errorMessage.message);
        }
        let result = yield (0, query_1.default)(insquery, values);
        let dbres = result.rows[0];
        status_1.successMessage.data = dbres;
        status_1.successMessage.data.message = "Book added successfully!";
        return status_1.successMessage;
    }
    catch (error) {
        status_1.errorMessage.message = error;
        throw new Error(status_1.errorMessage.message);
    }
});
exports.default = book;
//# sourceMappingURL=books.js.map