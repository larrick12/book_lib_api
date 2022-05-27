import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import UserType from './userschema';
import createuser from '../controller/signup';
import loginuser from '../controller/login';
import verifyToken from '../middleware/auths';
import book from '../controller/books';
import comments from '../controller/comment';
// import { dropComment, dropUser } from '../controller/delete';
import CommentType from './commentschema';
import BookType from './bookschema';
import { updateBook, updateComment } from '../controller/update';
import { dropBook, dropComment, dropUser } from '../controller/delete';


const MutationQuery = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        signup: {
            type: UserType,
            args: {
                firstname: { type: new GraphQLNonNull(GraphQLString) },
                lastname: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                let { status, data }: any = await createuser(args)
                if (data) {
                    data.status = status;
                    return data;
                } else {
                    let { message }: any = await createuser(args);
                    return message;
                }
            }
        },
        signin: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args, { req }) {
                let { status, data }: any = await loginuser(args, req)
                if (data) {
                    data.status = status;
                    return data;
                } else {
                    let { message }: any = await loginuser(args, req);
                    return message;
                }
            }
        },
        addbooks: {
            type: BookType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args, { req, res }) {
                await verifyToken(req, res);

                let { status, data }: any = await book(args, req);

                if (data) {
                    data.status = status
                    return data;
                } else {
                    let { message }: any = await book(args, req);
                    message.status = status;
                    return message
                }
            }
        },
        addcomment: {
            type: CommentType,
            args: {
                bid: { type: GraphQLInt },
                content: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args, { req, res }) {

                await verifyToken(req, res);

                let { status, data }: any = await comments(args, req);

                if (data) {
                    data.status = status
                    return data;
                }
                else {
                    let { message }: any = await comments(args, req);
                    return message
                }
            }
        },
        // update items query
        // ===========================================
        updatebook: {
            type: BookType,
            args: {
                bid: { type: GraphQLInt },
                title: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args, { req, res }) {

                await verifyToken(req, res);

                let { status, data }:any = await updateBook(args, req);
                if (data) {
                    console.log(data)
                    data.status = status;
                    return data;
                } else {
                    let { message }:any = await updateBook(args, req);
                    return message;
                }
            }
        },
        updatecomment: {
            type: CommentType,
            args: {
                cid: { type: new GraphQLNonNull(GraphQLID) },
                book_id: { type: new GraphQLNonNull(GraphQLID) },
                content: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args, { req, res }) {

                await verifyToken(req, res);
                let { status, data }:any = await updateComment(args, req);
                if (data) {
                    data.status = status;
                    return data;
                } else {
                    let { message }:any = await updateComment(args, req);
                    return message;
                }

            }
        },

        // delete items query
        // =============================================
        dropbook: {
            type: BookType,
            args: {
                bid: {type: GraphQLID!}
            },
            async resolve(parent, args, { req, res }) {
                await verifyToken(req, res);
                let { data }:any = await dropBook(args, req);
                return data;
            }
        },
        dropcomment: {
            type: CommentType,
            args: {
                cid: {type: GraphQLID!},
                bid: {type: GraphQLID!}
            },
            async resolve(parent, args, { req, res }) {
                await verifyToken(req, res);
                let { data }:any = await dropComment(args, req);
                return data;
            }
        },
        dropuser: {
            type: UserType,
            args: {
                uid: {type: GraphQLID!}
            },
            async resolve(parent, args, { req, res }) {
                await verifyToken(req, res);
                let { data }:any = await dropUser(args, req);
                return data;
            }
        },
    })
})


export default MutationQuery;