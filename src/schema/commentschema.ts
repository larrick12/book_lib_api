import {GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLString, GraphQLID } from 'graphql';
import query from '../db/query';
import verifyToken from '../middleware/auths';
import BookType from './bookschema';
import UserType from './userschema';


const CommentType: any = new GraphQLObjectType({
    name: 'comment',
    description: 'for comment table',
    fields: () => ({
        cid: { type: GraphQLInt },
        user_id: { type: GraphQLID },
        book_id: { type: GraphQLInt },
        content: { type: GraphQLString },
        commenter: { type: GraphQLString },
        likes: { type: GraphQLInt },
        dislikes: { type: GraphQLInt },
        created_at: {type: GraphQLString},
        status: { type: GraphQLString },
        message: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            async resolve(parent, args, {req, res}) {

                await verifyToken(req, res);

                let { rows }:any = await query(`SELECT * FROM bookuser WHERE uid=${parent.user_id}`);
                return rows
            }
        },
        books: {
            type: new GraphQLList(BookType),

            async resolve(parent, args, {req, res}) {

                await verifyToken(req, res);

                let { rows }:any = await query(`SELECT * FROM book WHERE bid=${parent.book_id}`);
                return rows
            }
        }
    })
})


export default CommentType