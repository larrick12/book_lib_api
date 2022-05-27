import {GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLString, GraphQLID } from 'graphql';
import query from '../db/query';
import verifyToken from '../middleware/auths';
import CommentType from './commentschema';
import UserType from './userschema';


const BookType = new GraphQLObjectType({
    name: 'book',
    description: 'book table for users',
    fields: () => ({
        bid: { type: GraphQLInt },
        user_id: { type: GraphQLID },
        title: { type: GraphQLString },
        author: { type: GraphQLString },
        content: { type: GraphQLString },
        like_user_id: { type: GraphQLInt },
        likes: { type: GraphQLInt },
        dislikes: { type: GraphQLInt },
        created_on: { type: GraphQLString },
        updated_on: { type: GraphQLString },
        status: { type: GraphQLString },
        message: { type: GraphQLString },
        user: {
            type: UserType,
            async resolve(parent, args, {req, res}) {

                await verifyToken(req, res);

                let { rows }:any = await query(`SELECT * FROM bookuser WHERE uid=${parent.user_id}`);
                if (rows[0] === undefined) {
                    return false;
                }
                return rows[0]
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            async resolve(parent, args, {req, res}) {
                await verifyToken(req, res);

                let { rows }:any = await query(`SELECT * FROM comment WHERE book_id=${parent.bid}`);
                return rows;
            }
        }
    })
})



export default BookType;