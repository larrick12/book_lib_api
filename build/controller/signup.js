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
// create user function to handle graphql mutation
const createuser = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, username, password } = args;
    const created_on = (0, moment_1.default)(new Date());
    if ((0, validation_1.isEmpty)(email) || (0, validation_1.isEmpty)(firstname) || (0, validation_1.isEmpty)(lastname) || (0, validation_1.isEmpty)(password) || (0, validation_1.isEmpty)(username)) {
        status_1.errorMessage.message = "asterick fields cannot be empty";
        throw new Error(status_1.errorMessage.message);
    }
    if (!(0, validation_1.isvalidEmail)(email)) {
        status_1.errorMessage.message = 'Please enter a valid Email';
        throw new Error(status_1.errorMessage.message);
    }
    if (!(0, validation_1.validPass)(password)) {
        status_1.errorMessage.message = 'Password must be more than seven(7) characters';
        throw new Error(status_1.errorMessage.message);
    }
    const hashedPassword = (0, validation_1.hashedPass)(password);
    const insquery = `INSERT INTO bookuser (firstname, lastname,  email, username, password, created_on) VALUES($1, $2, $3, $4, $5, $6 ) returning *`;
    const values = [
        firstname, lastname,
        email, username, hashedPassword,
        created_on
    ];
    try {
        const { rows } = yield (0, query_1.default)(insquery, values);
        const dbResponse = rows[0];
        delete dbResponse.password;
        const token = (0, validation_1.generateToken)(dbResponse.uid, dbResponse.firstname, dbResponse.lastname, dbResponse.middlename, dbResponse.email, dbResponse.username, dbResponse.gender, dbResponse.created_on, dbResponse.updated_on, dbResponse.last_login);
        status_1.successMessage.data = dbResponse;
        status_1.successMessage.data.token = token;
        return status_1.successMessage;
    }
    catch (error) {
        if (error.routine === '_bt_check_unique') {
            status_1.errorMessage.message = 'user with that EMAIL or USERNAME already exist';
            throw new Error(status_1.errorMessage.message);
        }
        console.log(error);
        status_1.errorMessage.message = 'Operation was not successful on signup section';
        throw new Error(status_1.errorMessage.message);
    }
});
exports.default = createuser;
//# sourceMappingURL=signup.js.map