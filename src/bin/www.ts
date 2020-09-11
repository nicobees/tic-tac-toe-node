import path from 'path'
import http from 'http'
import { Application } from 'express'
import app from '../app'
import { onServerError } from '../utils'
import { ServerConfig } from '../config'
// eslint-disable-next-line import/first
import config from 'config'
process.env.NODE_CONFIG_DIR = path.join(__dirname, '../config/')

// TODO #2 - implement Logger in order to use it also here if possible, instead of only writing to console output
process.on('uncaughtException', e => {
  console.log(e)
  process.exit(1)
})

process.on('unhandledRejection', e => {
  console.log(e)
  process.exit(1)
})

try {
  const envConfig = config.get<ServerConfig>('server')
  console.info('app start: ', envConfig)
  app(envConfig)
    .then((app: Application) => {
      const server = http.createServer(app)

      server
        .listen(envConfig.port, () => {
          console.info(`[${process.env.npm_package_name}] Server is running on port: ${envConfig.port}`)
        })
        .on('error', onServerError)
    })
    .catch((e: Error) => {
      throw e
    })
} catch (e) {
  console.error(e)
  process.exit(1)
}
