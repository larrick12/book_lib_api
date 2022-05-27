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
const moment_1 = __importDefault(require("moment"));
const query_1 = __importDefault(require("../db/query"));
const status_1 = require("../helper/status");
const validation_1 = require("../helper/validation");
const comments = (args, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, bid } = args;
    const user = req.user;
    if (!user || user == undefined) {
        status_1.errorMessage.message = "sorry you're unauthorized";
        throw new Error(status_1.errorMessage.message);
    }
    if ((0, validation_1.isEmpty)(content)) {
        status_1.errorMessage.message = "comment cannot be empty";
        throw new Error(status_1.errorMessage.message);
    }
    if (!user.last_login || user.last_login == null) {
        status_1.errorMessage.message = "you're not authenticated please login!";
        throw new Error(status_1.errorMessage.message);
    }
    const { uid, username } = user;
    let bookquery = `SELECT * FROM book WHERE bid=$1`;
    const created_at = (0, moment_1.default)(new Date());
    const user_id = uid;
    const commenter = username;
    const queries = `INSERT INTO comment(content, book_id, user_id, commenter, created_at) VALUES($1, $2, $3, $4, $5) returning *`;
    try {
        let resp = yield (0, query_1.default)(bookquery, [bid]);
        const dbres = resp.rows[0];
        if (!dbres || dbres == undefined) {
            status_1.errorMessage.message = "hey bitch you cant't comment on mising book!";
            throw new Error(status_1.errorMessage.message);
        }
        const { rows } = yield (0, query_1.default)(queries, [content, dbres.bid, user_id, commenter, created_at]);
        const dbresp = rows[0];
        status_1.successMessage.data = dbresp;
        status_1.successMessage.data.message = "comment added successfully!";
        return status_1.successMessage;
    }
    catch (error) {
        status_1.errorMessage.message = error;
        throw new Error(status_1.errorMessage.message);
    }
});
exports.default = comments;
//# sourceMappingURL=comment.js.map