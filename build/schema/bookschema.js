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
const auths_1 = __importDefault(require("../middleware/auths"));
const commentschema_1 = __importDefault(require("./commentschema"));
const userschema_1 = __importDefault(require("./userschema"));
const BookType = new graphql_1.GraphQLObjectType({
    name: 'book',
    description: 'book table for users',
    fields: () => ({
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
        status: { type: graphql_1.GraphQLString },
        message: { type: graphql_1.GraphQLString },
        user: {
            type: userschema_1.default,
            resolve(parent, args, { req, res }) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, auths_1.default)(req, res);
                    let { rows } = yield (0, query_1.default)(`SELECT * FROM bookuser WHERE uid=${parent.user_id}`);
                    if (rows[0] === undefined) {
                        return false;
                    }
                    return rows[0];
                });
            }
        },
        comments: {
            type: new graphql_1.GraphQLList(commentschema_1.default),
            resolve(parent, args, { req, res }) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, auths_1.default)(req, res);
                    let { rows } = yield (0, query_1.default)(`SELECT * FROM comment WHERE book_id=${parent.bid}`);
                    return rows;
                });
            }
        }
    })
});
exports.default = BookType;
//# sourceMappingURL=bookschema.js.map