"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const rootschema_1 = __importDefault(require("./rootschema"));
const mutationschema_1 = __importDefault(require("./mutationschema"));
const schema = new graphql_1.GraphQLSchema({
    query: rootschema_1.default,
    mutation: mutationschema_1.default
});
exports.schema = schema;
//# sourceMappingURL=schema.js.map