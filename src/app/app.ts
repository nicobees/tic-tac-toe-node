import express, { Application } from 'express'
import { ServerConfig } from '../config/Config'
import { Main } from '../components'

export default async (envConfig: ServerConfig): Promise<Application> => {
  const app: Application = express()

  console.info('inside Express App, envConfig: ', envConfig)

  const mainComponent = new Main()
  await mainComponent.init()

  return app
}
