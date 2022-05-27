"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const env_1 = __importDefault(require("./config/env"));
const cors_1 = __importDefault(require("cors"));
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schema/schema");
const graphql_playground_middleware_express_1 = __importDefault(require("graphql-playground-middleware-express"));
// import db_table_checker from './startdb';
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// check if our table bookuser exists
// db_table_checker()
app.use(env_1.default.graphql_path, (0, express_graphql_1.graphqlHTTP)((req, res, next) => ({
    schema: schema_1.schema,
    graphiql: true,
    pretty: true,
    context: {
        req,
        res,
        next
    }
})));
app.get(env_1.default.graphql_path, (0, graphql_playground_middleware_express_1.default)({ endpoint: '/graphql' }));
server.listen(env_1.default.port).on('listening', () => {
    console.log("running on port " + env_1.default.port);
});
//# sourceMappingURL=index.js.map