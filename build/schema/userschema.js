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
const graphql_1 = require("graphql");
const query_1 = __importDefault(require("../db/query"));
// import CommentType from './commentschema';
const bookschema_1 = __importDefault(require("./bookschema"));
// user query
const UserType = new graphql_1.GraphQLObjectType({
    name: 'user',
    description: 'user table',
    fields: () => ({
        uid: { type: graphql_1.GraphQLID },
        firstname: { type: graphql_1.GraphQLString },
        lastname: { type: graphql_1.GraphQLString },
        middlename: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        username: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        gender: { type: graphql_1.GraphQLString },
        created_on: { type: graphql_1.GraphQLString },
        updated_on: { type: graphql_1.GraphQLString },
        last_login: { type: graphql_1.GraphQLString },
        token: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
        message: { type: graphql_1.GraphQLString },
        books: {
            type: new graphql_1.GraphQLList(bookschema_1.default),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    let bookquery = `SELECT * FROM book WHERE user_id=${parent.uid}`;
                    let { rows } = yield (0, query_1.default)(bookquery);
                    return rows;
                });
            }
        },
        book: {
            type: bookschema_1.default,
            args: {
                book_id: { type: graphql_1.GraphQLID }
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    let bookquery = `SELECT * FROM book WHERE user_id=${parent.uid}`;
                    let { rows } = yield (0, query_1.default)(bookquery);
                    if (rows[0].user_id !== parent.uid) {
                        return false;
                    }
                    else {
                        return rows[0];
                    }
                });
            }
        }
    })
});
exports.default = UserType;
//# sourceMappingURL=userschema.js.map