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
const query_1 = __importDefault(require("../db/query"));
const moment_1 = __importDefault(require("moment"));
const validation_1 = require("../helper/validation");
const status_1 = require("../helper/status");
/**
* login in user
* @param {object} req
* @returns {object} updated user
*/
const loginuser = (args, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = args;
    if ((0, validation_1.isEmpty)(email) || (0, validation_1.isEmpty)(password)) {
        status_1.errorMessage.message = 'Email or Password detail is missing';
        throw new Error(status_1.errorMessage.message);
    }
    if (!(0, validation_1.isvalidEmail)(email)) {
        status_1.errorMessage.message = 'Please enter a valid Email';
        throw new Error(status_1.errorMessage.message);
    }
    if (!(0, validation_1.validPass)(password)) {
        status_1.errorMessage.message = 'Password too short or incorrect';
        throw new Error(status_1.errorMessage.message);
    }
    let lastlogin = (0, moment_1.default)(new Date());
    const loginQuery = `SELECT * FROM bookuser WHERE email=$1`;
    const updatequery = `UPDATE bookuser SET last_login=$1 WHERE email=$2 returning *`;
    try {
        const { rows } = yield (0, query_1.default)(loginQuery, [email]);
        const response = rows[0];
        if (!response || response == undefined) {
            status_1.errorMessage.message = 'User with this email cannot be found';
            throw new Error(status_1.errorMessage.message);
        }
        if (!(0, validation_1.comparePass)(response.password, password)) {
            status_1.errorMessage.message = 'The password you provided is incorrect';
            throw new Error(status_1.errorMessage.message);
        }
        const res = yield (0, query_1.default)(updatequery, [lastlogin, email]);
        const dbResponse = res.rows[0];
        delete dbResponse.password;
        const token = (0, validation_1.generateToken)(dbResponse.uid, dbResponse.firstname, dbResponse.lastname, dbResponse.middlename, dbResponse.email, dbResponse.username, dbResponse.gender, dbResponse.created_on, dbResponse.updated_on, dbResponse.last_login);
        status_1.successMessage.data = dbResponse;
        status_1.successMessage.data.token = token;
        return status_1.successMessage;
    }
    catch (error) {
        status_1.errorMessage.message = error;
        throw new Error(status_1.errorMessage.message);
    }
});
exports.default = loginuser;
//# sourceMappingURL=login.js.map