import express, { Application } from 'express'
import { ServerConfig } from '../config/Config'
import { ApolloServer } from 'apollo-server-express'
import schema from '../graphql/schema'
import cors from 'cors'
import { Main } from '../components'

export default async (envConfig: ServerConfig): Promise<Application> => {
  const app: Application = express()

  const mainComponent = new Main()
  await mainComponent.init()

  app.use('*', cors())

  const server = new ApolloServer({
    schema,
    playground: true,
    dataSources: () => ({
      GameController: mainComponent.getController('game')
    })
  })

  server.applyMiddleware({ app, path: '/graphql' })

  return app
}
