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
exports.updateComment = exports.updateBook = void 0;
const query_1 = __importDefault(require("../db/query"));
const moment_1 = __importDefault(require("moment"));
const validation_1 = require("../helper/validation");
const status_1 = require("../helper/status");
// create user function to handle graphql mutation
const updateBook = (args, req) => __awaiter(void 0, void 0, void 0, function* () {
    let { bid, title, content } = args;
    let user = req.user;
    if (!user || user == undefined) {
        status_1.errorMessage.message = "you're unauthorized to update book!";
        throw new Error(status_1.errorMessage.message);
    }
    if (!bid || bid == undefined) {
        status_1.errorMessage.message = "book id not supplied";
        throw new Error(status_1.errorMessage.message);
    }
    if ((0, validation_1.isEmpty)(title) || (0, validation_1.isEmpty)(content)) {
        status_1.errorMessage.message = "asterick fields cannot be empty";
        throw new Error(status_1.errorMessage.message);
    }
    if (!user.last_login || user.last_login == undefined) {
        status_1.errorMessage.message = "you're not authorized to update book please login!";
        throw new Error(status_1.errorMessage.message);
    }
    let updated_on = (0, moment_1.default)(new Date());
    const findbookQuery = `SELECT * FROM book WHERE bid=${bid}`;
    let bookquery = `UPDATE book SET title=$1, content=$2, updated_on=$3 WHERE bid=$4 returning *`;
    let values = [
        title, content, updated_on, bid
    ];
    try {
        const bookres = yield (0, query_1.default)(findbookQuery);
        const found = bookres.rows[0];
        if (!found || found == undefined) {
            status_1.errorMessage.message = "book not found";
            throw new Error(status_1.errorMessage.message);
        }
        ;
        const { rows } = yield (0, query_1.default)(bookquery, values);
        const dbResponse = rows[0];
        status_1.successMessage.data = dbResponse;
        status_1.successMessage.data.message = "Book updated Successfully";
        return status_1.successMessage;
    }
    catch (error) {
        status_1.errorMessage.message = error;
        throw new Error(status_1.errorMessage.message);
    }
});
exports.updateBook = updateBook;
const updateComment = (args, req) => __awaiter(void 0, void 0, void 0, function* () {
    let { cid, content } = args;
    let user = req.user;
    if (!user || user == undefined) {
        status_1.errorMessage.message = "you're unauthorized to update comment!";
        throw new Error(status_1.errorMessage.message);
    }
    if ((0, validation_1.isEmpty)(cid) || (0, validation_1.isEmpty)(content)) {
        status_1.errorMessage.message = "asterick fields cannot be empty";
        throw new Error(status_1.errorMessage.message);
    }
    if (!user.last_login || user.last_login == undefined) {
        status_1.errorMessage.message = "you're not authorized to update comment please login!";
        throw new Error(status_1.errorMessage.message);
    }
    let updated_at = (0, moment_1.default)(new Date());
    const findcommentQuery = `SELECT * FROM comment WHERE cid=${cid}`;
    let commentquery = `UPDATE comment SET content=$1, updated_at=$2 WHERE cid=$3 returning *`;
    const values = [
        content,
        updated_at,
        cid
    ];
    try {
        const commentres = yield (0, query_1.default)(findcommentQuery);
        const found = commentres.rows[0];
        if (!found || found == undefined) {
            status_1.errorMessage.message = "comment not found";
            throw new Error(status_1.errorMessage.message);
        }
        let { rows } = yield (0, query_1.default)(commentquery, values);
        let dbResponse = rows[0];
        status_1.successMessage.data = dbResponse;
        status_1.successMessage.data.message = "Comment updated Successfully";
        return status_1.successMessage;
    }
    catch (error) {
        status_1.errorMessage.message = 'operation was not successful';
        throw new Error(status_1.errorMessage.message);
    }
});
exports.updateComment = updateComment;
//# sourceMappingURL=update.js.map