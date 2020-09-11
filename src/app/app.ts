import express, { Application } from 'express'
import { ServerConfig } from '../config/Config'

export default async (envConfig: ServerConfig): Promise<Application> => {
  const app: Application = express()

  console.info('inside Express App, envConfig: ', envConfig)

  return app
}
