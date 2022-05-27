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
exports.dropUser = exports.dropComment = exports.dropBook = void 0;
const query_1 = __importDefault(require("../db/query"));
const status_1 = require("../helper/status");
const dropBook = (args, req) => __awaiter(void 0, void 0, void 0, function* () {
    let { bid } = args;
    const user = req.user;
    const { uid } = user;
    if (!user) {
        status_1.errorMessage.message = "you're unauthorized to delete book";
        throw new Error(status_1.errorMessage.message);
    }
    if (!user.last_login) {
        status_1.errorMessage.message = "you're unauthorized to delete book";
        throw new Error(status_1.errorMessage.message);
    }
    const findbook = `SELECT * FROM book WHERE bid=${bid}`;
    const dropquery = `DELETE FROM book WHERE bid=$1 AND user_id=${uid} returning *`;
    try {
        const f = yield (0, query_1.default)(findbook);
        const d = f.rows[0];
        if (!d || d == undefined) {
            status_1.errorMessage.message = "you have no book with that id";
            throw new Error(status_1.errorMessage.message);
        }
        const { rows } = yield (0, query_1.default)(dropquery, [d.bid]);
        const dbresp = rows[0];
        status_1.successMessage.data = dbresp;
        status_1.successMessage.data.message = " book deleted successfully";
        return status_1.successMessage;
    }
    catch (error) {
        status_1.errorMessage.message = error;
        throw new Error(status_1.errorMessage.message);
    }
});
exports.dropBook = dropBook;
const dropUser = (args, req) => __awaiter(void 0, void 0, void 0, function* () {
    let { uid } = args;
    const user = req.user;
    if (!user || user == undefined) {
        status_1.errorMessage.message = "you're unauthorized to delete your account";
        throw new Error(status_1.errorMessage.message);
    }
    if (!user.last_login || user.last_login == undefined) {
        status_1.errorMessage.message = "you're unauthorized to delete your account please login to continue!";
        throw new Error(status_1.errorMessage.message);
    }
    const findbook = `SELECT * FROM bookuser WHERE uid=${uid}`;
    const dropquery = `DELETE FROM bookuser WHERE uid=$1 returning *`;
    try {
        const f = yield (0, query_1.default)(findbook);
        const d = f.rows[0];
        if (!d || d == undefined) {
            status_1.errorMessage.message = "you have no user with that id";
            throw new Error(status_1.errorMessage.message);
        }
        const { rows } = yield (0, query_1.default)(dropquery, [d.uid]);
        const dbresp = rows[0];
        status_1.successMessage.data = dbresp;
        status_1.successMessage.data.message = " user deleted successfully";
        return status_1.successMessage;
    }
    catch (error) {
        status_1.errorMessage.message = error;
        throw new Error(status_1.errorMessage.message);
    }
});
exports.dropUser = dropUser;
const dropComment = (args, req) => __awaiter(void 0, void 0, void 0, function* () {
    let { cid, bid } = args;
    const user = req.user;
    let { uid } = user;
    if (!user || user == undefined) {
        status_1.errorMessage.message = "you're unauthorized to delete your comment";
        throw new Error(status_1.errorMessage.message);
    }
    if (!user.last_login || user.last_login == undefined) {
        status_1.errorMessage.message = "you're unauthorized to delete your comment please login to continue!";
        throw new Error(status_1.errorMessage.message);
    }
    const findbook = `SELECT * FROM comment WHERE cid=${cid}`;
    const dropquery = `DELETE FROM comment WHERE cid=$1 AND book_id=${bid} AND user_id=${uid} returning *`;
    try {
        const f = yield (0, query_1.default)(findbook);
        const d = f.rows[0];
        if (!d || d == undefined) {
            status_1.errorMessage.message = "you have no comment with that id";
            throw new Error(status_1.errorMessage.message);
        }
        const { rows } = yield (0, query_1.default)(dropquery, [d.cid]);
        const dbresp = rows[0];
        status_1.successMessage.data = dbresp;
        status_1.successMessage.data.message = " comment deleted successfully";
        return status_1.successMessage;
    }
    catch (error) {
        status_1.errorMessage.message = error;
        throw new Error(status_1.errorMessage.message);
    }
});
exports.dropComment = dropComment;
//# sourceMappingURL=delete.js.map