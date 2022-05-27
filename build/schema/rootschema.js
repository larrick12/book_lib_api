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
const commentschema_1 = __importDefault(require("./commentschema"));
const bookschema_1 = __importDefault(require("./bookschema"));
const userschema_1 = __importDefault(require("./userschema"));
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    description: '',
    fields: {
        users: {
            type: new graphql_1.GraphQLList(userschema_1.default),
            args: {
                uid: { type: graphql_1.GraphQLID },
                firstname: { type: graphql_1.GraphQLString },
                lastname: { type: graphql_1.GraphQLString },
                middlename: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString },
                username: { type: graphql_1.GraphQLString },
                gender: { type: graphql_1.GraphQLString },
                created_on: { type: graphql_1.GraphQLString },
                updated_on: { type: graphql_1.GraphQLString },
                last_login: { type: graphql_1.GraphQLString },
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let { rows } = yield (0, query_1.default)('SELECT * FROM bookuser');
                        return rows;
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
            }
        },
        user: {
            type: userschema_1.default,
            args: {
                uid: { type: graphql_1.GraphQLID },
                firstname: { type: graphql_1.GraphQLString },
                lastname: { type: graphql_1.GraphQLString },
                middlename: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString },
                username: { type: graphql_1.GraphQLString },
                gender: { type: graphql_1.GraphQLString },
                created_on: { type: graphql_1.GraphQLString },
                updated_on: { type: graphql_1.GraphQLString },
                last_login: { type: graphql_1.GraphQLString },
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let userquery = `SELECT * FROM bookuser WHERE uid=${args.uid}`;
                        let { rows } = yield (0, query_1.default)(userquery);
                        if (rows[0] === undefined) {
                            return false;
                        }
                        else {
                            return rows[0];
                        }
                    }
                    catch (e) {
                        console.log(e);
                    }
                });
            }
        },
        books: {
            type: new graphql_1.GraphQLList(bookschema_1.default),
            args: {
                bid: { type: graphql_1.GraphQLInt },
                user_id: { type: graphql_1.GraphQLID },
                title: { type: graphql_1.GraphQLString },
                author: { type: graphql_1.GraphQLString },
                content: { type: graphql_1.GraphQLString },
                like_user_id: { type: graphql_1.GraphQLInt },
                likes: { type: graphql_1.GraphQLInt },
                dislikes: { type: graphql_1.GraphQLInt },
                created_on: { type: graphql_1.GraphQLString },
                updated_on: { type: graphql_1.GraphQLString }
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let res = yield (0, query_1.default)('SELECT * FROM book');
                        return res.rows;
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
            }
        },
        book: {
            type: bookschema_1.default,
            args: {
                bid: { type: graphql_1.GraphQLInt },
                user_id: { type: graphql_1.GraphQLID },
                title: { type: graphql_1.GraphQLString },
                author: { type: graphql_1.GraphQLString },
                content: { type: graphql_1.GraphQLString },
                like_user_id: { type: graphql_1.GraphQLInt },
                likes: { type: graphql_1.GraphQLInt },
                dislikes: { type: graphql_1.GraphQLInt },
                created_on: { type: graphql_1.GraphQLString },
                updated_on: { type: graphql_1.GraphQLString },
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let { rows } = yield (0, query_1.default)(`SELECT * FROM book WHERE bid=${args.bid}`);
                        if (rows[0] === undefined) {
                            return false;
                        }
                        return rows[0];
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
            }
        },
        comments: {
            type: new graphql_1.GraphQLList(commentschema_1.default),
            args: {
                cid: { type: graphql_1.GraphQLInt },
                user_id: { type: graphql_1.GraphQLID },
                book_id: { type: graphql_1.GraphQLInt },
                commenter: { type: graphql_1.GraphQLString },
                content: { type: graphql_1.GraphQLString },
                likes: { type: graphql_1.GraphQLInt },
                dislikes: { type: graphql_1.GraphQLInt },
                created_at: { type: graphql_1.GraphQLString }
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    let { rows } = yield (0, query_1.default)(`SELECT * FROM comment`);
                    if (rows.length === 0) {
                        return;
                    }
                    else {
                        return rows;
                    }
                });
            }
        },
        comment: {
            type: commentschema_1.default,
            args: {
                cid: { type: graphql_1.GraphQLInt },
                user_id: { type: graphql_1.GraphQLID },
                book_id: { type: graphql_1.GraphQLInt },
                commenter: { type: graphql_1.GraphQLString },
                content: { type: graphql_1.GraphQLString },
                likes: { type: graphql_1.GraphQLInt },
                dislikes: { type: graphql_1.GraphQLInt },
                created_at: { type: graphql_1.GraphQLString }
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    let { rows } = yield (0, query_1.default)(`SELECT * FROM comment WHERE cid=${args.cid}`);
                    if (rows[0] === undefined) {
                        return;
                    }
                    return rows[0];
                });
            }
        }
    }
});
exports.default = RootQuery;
//# sourceMappingURL=rootschema.js.map