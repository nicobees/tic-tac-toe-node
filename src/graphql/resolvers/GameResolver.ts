import { IResolvers } from 'graphql-tools'
import { Game } from '../../components/Game'

const GameResolver: IResolvers = {
  Query: {
    getGame: (_, { id }, { dataSources }): Game | undefined => {
      console.info('in getGame resolver: ', id)
      return dataSources.GameController.getGame(id)
    }
  }
}

export default GameResolver
