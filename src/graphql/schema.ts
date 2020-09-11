import 'graphql-import-node'
import { GraphQLSchema } from 'graphql'
import * as typeDefs from './schema.graphql'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
