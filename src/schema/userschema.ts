import {GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID } from 'graphql';
import query from '../db/query';
// import CommentType from './commentschema';
import BookType from './bookschema';


// user query
const UserType: any = new GraphQLObjectType({
    name: 'user',
    description: 'user table',
    fields: () => ({
        uid: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        middlename: { type: GraphQLString },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        gender: { type: GraphQLString },
        created_on: { type: GraphQLString },
        updated_on: { type: GraphQLString },
        last_login: { type: GraphQLString },
        token: { type: GraphQLString },
        status: { type: GraphQLString },
        message: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args) {
                let bookquery = `SELECT * FROM book WHERE user_id=${parent.uid}`;
                let { rows }:any = await query(bookquery)
                return rows;
            }
        },
        book: {
            type: BookType,
            args: {
                book_id: { type: GraphQLID }
            },
            async resolve(parent, args) {
                let bookquery = `SELECT * FROM book WHERE user_id=${parent.uid}`;
                let { rows }:any = await query(bookquery)
                if (rows[0].user_id !== parent.uid) {
                    return false;
                }
                else {
                    return rows[0];
                }

            }
        }
    })
});


export default UserType
