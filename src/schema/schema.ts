import {GraphQLSchema} from 'graphql';
import RootQuery from './rootschema';
import MutationQuery from './mutationschema';


const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: MutationQuery
})



export { schema }
