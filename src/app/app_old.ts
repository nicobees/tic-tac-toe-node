import express, { Application } from 'express'
import { ServerConfig } from '../config/Config'

import bodyParser from 'body-parser'
import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

/**
 * 1) create instance of main component, this will be initialised and it will return routes to be applied as express routes
 * - main component is the main application, not related to the server application (Express in this case), in order to easy switch to another server application if needed
 * - it returns a Promise hence it must be awaited for it to resolve before proceed
 *
 * 2) create instance of generic response handler: it will take basic response (simple data) from main components routes
 * 3) create instance of generic error handler: it will take basic error response (exceptions thrown) from main components routes
 * 4) returns server application instance (Express application in this case)
 */

export default async (envConfig: ServerConfig): Promise<Application> => {
  // const mainComponent = new Main(environment)
  // await mainComponent.init()

  const app: Application = express()

  const books = [
    {
      id: 1,
      title: "Harry Potter and the Sorcerer's stone",
      author: 'J.K. Rowling'
    },
    {
      id: 2,
      title: 'Test',
      author: 'Test author'
    }
  ] as {id: number, title: string, author: string}[]

  // The GraphQL schema in string form
  const typeDefs = `
    type Book { id: Int, title: String, author: String }
    type Query { getBooks(id: Int): [Book] }
  `

  // The resolvers
  const resolvers = {
    Query: {
      getBooks: (id: number): {id: number, title: string, author: string} | undefined => {
        console.info('inside resolver: ', books, id)
        return books.find(book => book.id === id)
      }
    }
  }

  // Put together a schema
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  })

  const server = new ApolloServer({
    // typeDefs,
    // resolvers,
    schema,
    playground: {
      endpoint: '/graphql'
    }
  })

  server.applyMiddleware({ app, path: '/graphql' })

  // // The GraphQL endpoint
  // app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

  // // GraphiQL, a visual editor for queries
  // app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  // // default middleware
  // applyMiddlewareExpress(middleware, app)

  // // api routes
  // applyRoutesExpress(mainComponent.getRoutes(), app)

  // // error handlers
  // applyErrorHandlers(environment, app)

  return app
}
