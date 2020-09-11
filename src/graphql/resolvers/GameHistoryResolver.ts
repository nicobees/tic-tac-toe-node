import { IResolvers } from 'graphql-tools'

const GameHistoryResolver: IResolvers = {
  Query: {
    getGameHistory: (_, __, { dataSources }): string => {
      return dataSources.GameController.getGameHistory()
    }
  }
}

export default GameHistoryResolver
