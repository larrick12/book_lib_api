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
const userschema_1 = __importDefault(require("./userschema"));
const signup_1 = __importDefault(require("../controller/signup"));
const login_1 = __importDefault(require("../controller/login"));
const auths_1 = __importDefault(require("../middleware/auths"));
const books_1 = __importDefault(require("../controller/books"));
const comment_1 = __importDefault(require("../controller/comment"));
// import { dropComment, dropUser } from '../controller/delete';
const commentschema_1 = __importDefault(require("./commentschema"));
const bookschema_1 = __importDefault(require("./bookschema"));
const update_1 = require("../controller/update");
const delete_1 = require("../controller/delete");
const MutationQuery = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        signup: {
            type: userschema_1.default,
            args: {
                firstname: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                lastname: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                username: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    let { status, data } = yield (0, signup_1.default)(args);
                    if (data) {
                        data.status = status;
                        return data;
                    }
                    else {
                        let { message } = yield (0, signup_1.default)(args);
                        return message;
                    }
                });
            }
        },
        signin: {
            type: userschema_1.default,
            args: {
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, args, { req }) {
                return __awaiter(this, void 0, void 0, function* () {
                    let { status, data } = yield (0, login_1.default)(args, req);
                    if (data) {
                        data.status = status;
                        return data;
                    }
                    else {
                        let { message } = yield (0, login_1.default)(args, req);
                        return message;
                    }
                });
            }
        },
        addbooks: {
            type: bookschema_1.default,
            args: {
                title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                content: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, args, { req, res }) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, auths_1.default)(req, res);
                    let { status, data } = yield (0, books_1.default)(args, req);
                    if (data) {
                        data.status = status;
                        return data;
                    }
                    else {
                        let { message } = yield (0, books_1.default)(args, req);
                        message.status = status;
                        return message;
                    }
                });
            }
        },
        addcomment: {
            type: commentschema_1.default,
            args: {
                bid: { type: graphql_1.GraphQLInt },
                content: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, args, { req, res }) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, auths_1.default)(req, res);
                    let { status, data } = yield (0, comment_1.default)(args, req);
                    if (data) {
                        data.status = status;
                        return data;
                    }
                    else {
                        let { message } = yield (0, comment_1.default)(args, req);
                        return message;
                    }
                });
            }
        },
        // update items query
        // ===========================================
        updatebook: {
            type: bookschema_1.default,
            args: {
                bid: { type: graphql_1.GraphQLInt },
                title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                content: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, args, { req, res }) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, auths_1.default)(req, res);
                    let { status, data } = yield (0, update_1.updateBook)(args, req);
                    if (data) {
                        console.log(data);
                        data.status = status;
                        return data;
                    }
                    else {
                        let { message } = yield (0, update_1.updateBook)(args, req);
                        return message;
                    }
                });
            }
        },
        updatecomment: {
            type: commentschema_1.default,
            args: {
                cid: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                book_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                content: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, args, { req, res }) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, auths_1.default)(req, res);
                    let { status, data } = yield (0, update_1.updateComment)(args, req);
                    if (data) {
                        data.status = status;
                        return data;
                    }
                    else {
                        let { message } = yield (0, update_1.updateComment)(args, req);
                        return message;
                    }
                });
            }
        },
        // delete items query
        // =============================================
        dropbook: {
            type: bookschema_1.default,
            args: {
                bid: { type: graphql_1.GraphQLID }
            },
            resolve(parent, args, { req, res }) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, auths_1.default)(req, res);
                    let { data } = yield (0, delete_1.dropBook)(args, req);
                    return data;
                });
            }
        },
        dropcomment: {
            type: commentschema_1.default,
            args: {
                cid: { type: graphql_1.GraphQLID },
                bid: { type: graphql_1.GraphQLID }
            },
            resolve(parent, args, { req, res }) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, auths_1.default)(req, res);
                    let { data } = yield (0, delete_1.dropComment)(args, req);
                    return data;
                });
            }
        },
        dropuser: {
            type: userschema_1.default,
            args: {
                uid: { type: graphql_1.GraphQLID }
            },
            resolve(parent, args, { req, res }) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, auths_1.default)(req, res);
                    let { data } = yield (0, delete_1.dropUser)(args, req);
                    return data;
                });
            }
        },
    })
});
exports.default = MutationQuery;
//# sourceMappingURL=mutationschema.js.map