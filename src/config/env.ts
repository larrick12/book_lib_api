import dotenv from 'dotenv';
dotenv.config();

const { env } = process;

let config: any;

switch(env.NODE_ENV){
    case "production" :
        config = { 
        environment: env.NODE_ENV,
        port: env.PORT,
        db_uri: env.HEROKU_PSQL_URI,
        secret: env.SECRET,
        dbName: env.DB_NAME,
        dbName_book: env.DB_NAME_BOOK,
        dbName_comment: env.DB_NAME_COMMENT,
        graphql_path: env.GRAPHQL_PATH
        }
        break;
    case "development" : 
        config = { 
        environment: env.NODE_ENV,
        port: env.PORT || 8050,
        db_uri: env.DB_URI,
        secret: env.SECRET,
        dbName: env.DB_NAME,
        dbName_book: env.DB_NAME_BOOK,
        dbName_comment: env.DB_NAME_COMMENT,
        graphql_path: env.GRAPHQL_PATH,
        }
} 
   

export default config