import { IResolvers } from 'graphql-tools'

import GameResolver from './GameResolver'
import GameHistoryResolver from './GameHistoryResolver'

const resolvers: IResolvers = {
  ...GameResolver,
  ...GameHistoryResolver
}

export default GameResolver
