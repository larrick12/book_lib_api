import {GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLString, GraphQLID } from 'graphql';
import query from '../db/query';
import CommentType from './commentschema';
import BookType from './bookschema';
import UserType from './userschema';


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: '',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            args: {
                uid: { type: GraphQLID },
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                middlename: { type: GraphQLString },
                email: { type: GraphQLString },
                username: { type: GraphQLString },
                gender: { type: GraphQLString },
                created_on: { type: GraphQLString },
                updated_on: { type: GraphQLString },
                last_login: { type: GraphQLString },
            },
            async resolve(parent, args) {
                try {
                    let { rows }:any = await query('SELECT * FROM bookuser');
                    return rows
                }
                catch (error) {
                    console.log(error)
                }
            }
        },
        user: {
            type: UserType,
            args: {
                uid: { type: GraphQLID },
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                middlename: { type: GraphQLString },
                email: { type: GraphQLString },
                username: { type: GraphQLString },
                gender: { type: GraphQLString },
                created_on: { type: GraphQLString },
                updated_on: { type: GraphQLString },
                last_login: { type: GraphQLString },
            },
            async resolve(parent, args) {
                try {
                    let userquery = `SELECT * FROM bookuser WHERE uid=${args.uid}`;
                    let { rows }:any = await query(userquery)
                    if (rows[0] === undefined) {
                        return false;
                    }
                    else {
                        return rows[0]
                    }
                }
                catch (e) {
                    console.log(e)
                }
            }
        },
        books: {
            type: new GraphQLList(BookType),
            args: {
                bid: { type: GraphQLInt },
                user_id: { type: GraphQLID },
                title: { type: GraphQLString },
                author: { type: GraphQLString },
                content: { type: GraphQLString },
                like_user_id: { type: GraphQLInt },
                likes: { type: GraphQLInt },
                dislikes: { type: GraphQLInt },
                created_on: { type: GraphQLString },
                updated_on: { type: GraphQLString }
            },
            async resolve(parent, args) {
                try {
                    let res: any = await query('SELECT * FROM book')
                    return res.rows
                }
                catch (error) {
                    console.log(error)
                }
            }
        },
        book: {
            type: BookType,
            args: {
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
            },
            async resolve(parent, args) {
                try {
                    let { rows }:any = await query(`SELECT * FROM book WHERE bid=${args.bid}`);
                    if (rows[0] === undefined) {
                        return false;
                    }

                    return rows[0]
                }
                catch (error) {
                    console.log(error)
                }
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            args: {
                cid: { type: GraphQLInt },
                user_id: { type: GraphQLID },
                book_id: { type: GraphQLInt },
                commenter: { type: GraphQLString },
                content: { type: GraphQLString },
                likes: { type: GraphQLInt },
                dislikes: { type: GraphQLInt },
                created_at: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let { rows }:any = await query(`SELECT * FROM comment`);
                if (rows.length === 0) {
                    return;
                } else {
                    return rows;
                }
            }
        },
        comment: {
            type: CommentType,
            args: {
                cid: { type: GraphQLInt },
                user_id: { type: GraphQLID },
                book_id: { type: GraphQLInt },
                commenter: { type: GraphQLString },
                content: { type: GraphQLString },
                likes: { type: GraphQLInt },
                dislikes: { type: GraphQLInt },
                created_at: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let { rows }:any = await query(`SELECT * FROM comment WHERE cid=${args.cid}`);
                if (rows[0] === undefined) {
                    return;
                }
                return rows[0];
            }
        }
    }

});


export default RootQuery;