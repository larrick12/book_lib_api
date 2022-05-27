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
const bookschema_1 = __importDefault(require("./bookschema"));
const userschema_1 = __importDefault(require("./userschema"));
const CommentType = new graphql_1.GraphQLObjectType({
    name: 'comment',
    description: 'for comment table',
    fields: () => ({
        cid: { type: graphql_1.GraphQLInt },
        user_id: { type: graphql_1.GraphQLID },
        book_id: { type: graphql_1.GraphQLInt },
        content: { type: graphql_1.GraphQLString },
        commenter: { type: graphql_1.GraphQLString },
        likes: { type: graphql_1.GraphQLInt },
        dislikes: { type: graphql_1.GraphQLInt },
        created_at: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
        message: { type: graphql_1.GraphQLString },
        users: {
            type: new graphql_1.GraphQLList(userschema_1.default),
            resolve(parent, args, { req, res }) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, auths_1.default)(req, res);
                    let { rows } = yield (0, query_1.default)(`SELECT * FROM bookuser WHERE uid=${parent.user_id}`);
                    return rows;
                });
            }
        },
        books: {
            type: new graphql_1.GraphQLList(bookschema_1.default),
            resolve(parent, args, { req, res }) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, auths_1.default)(req, res);
                    let { rows } = yield (0, query_1.default)(`SELECT * FROM book WHERE bid=${parent.book_id}`);
                    return rows;
                });
            }
        }
    })
});
exports.default = CommentType;
//# sourceMappingURL=commentschema.js.map