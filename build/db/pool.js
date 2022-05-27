"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const env_1 = __importDefault(require("../config/env"));
const dbconnectionConfig = {
    connectionString: env_1.default.db_uri
};
const pool = new pg_1.Pool(dbconnectionConfig);
exports.default = pool;
//# sourceMappingURL=pool.js.map