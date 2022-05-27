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
/* eslint-disable max-len */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const status_1 = require("../helper/status");
const env_1 = __importDefault(require("../config/env"));
/**
   * Verify Token
   * @param {object} req
   * @returns {object|void} response object
   */
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bearerHeader = req.headers['authorization'] || '';
    const token = bearerHeader.split(' ')[1];
    if (!token) {
        status_1.errorMessage.message = 'Token not provided';
        res.statusCode = status_1.status.unauthorized;
        throw new Error(status_1.errorMessage.message);
    }
    // const decodedToken = jwt.decode(token, {complete:true});
    // const verifyOptions : jwt.VerifyOptions = {
    //     algorithms: ['RS256', 'RS384', 'RS512'],
    //     issuer: `http://localhost/8050/graphql`,
    //     clockTolerance:300
    //     }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.default.secret);
        req.user = {
            uid: decoded.uid,
            firstname: decoded.firstname,
            lastname: decoded.lastname,
            middlename: decoded.middlename,
            email: decoded.email,
            username: decoded.username,
            gender: decoded.gender,
            created_on: decoded.created_on,
            updated_on: decoded.updated_on,
            last_login: decoded.last_login,
        };
        res.statusCode = status_1.status.success;
        return req.user;
    }
    catch (error) {
        status_1.errorMessage.message = error;
        res.statusCode = status_1.status.unauthorized;
        throw new Error(status_1.errorMessage.message);
    }
});
exports.default = verifyToken;
//# sourceMappingURL=auths.js.map