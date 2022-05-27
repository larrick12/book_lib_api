import express from 'express';
import http from 'http';
import env from './config/env';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema/schema';
import expressPlayground from 'graphql-playground-middleware-express';
// import db_table_checker from './startdb';


const app = express()
const server = http.createServer(app);

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// check if our table bookuser exists
// db_table_checker()

app.use(env.graphql_path, graphqlHTTP((req, res, next) => ({
    schema,
    graphiql: true,
    pretty: true,
    context: {
        req,
        res,
        next
    }
}))
)

app.get(env.graphql_path, expressPlayground({endpoint: '/graphql'}))

server.listen(env.port).on('listening', () => {
    console.log("running on port " + env.port);
});