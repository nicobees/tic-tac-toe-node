import { Config } from './Config'

export default {
  server: {
    environment: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 4000
  }
} as Config
