import dotenv from 'dotenv';
dotenv.config();

const { env } = process;

const config = {
    environment: env.NODE_ENV,
    port: env.PORT || 8050,
    db_uri: env.DB_URI || 'postgresql://postgres:larrick1258@localhost:5432/booklibrary',
    secret: env.SECRET,
    dbName: env.DB_NAME || 'bookuser',
    dbName_book: env.DB_NAME_BOOK || 'book',
    dbName_comment: env.DB_NAME_COMMENT || 'comment',
    graphql_path: env.GRAPHQL_PATH || '/graphql',
    
}

export default config