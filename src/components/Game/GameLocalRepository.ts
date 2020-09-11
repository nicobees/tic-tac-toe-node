import { GameCreate, Game } from './Game'
import { GameRepositoryInterface } from './GameRepositoryInterface'

type GameRepository = Record<Game['id'], Game>

export class GameLocalRepository implements GameRepositoryInterface {
  constructor (private gameRepositoryLocal: GameRepository = {}) {
    this.gameRepositoryLocal = {
      '0001': {
        id: '0001',
        players: ['Player1', 'Player2'],
        board: '---00X--X'
      }
    }
  }

  public async getGame (id: Game['id']): Promise<Game> {
    if (!this.gameRepositoryLocal[id]) {
      throw new Error(`NotFound - Game - id: ${id}`)
    }
    return this.gameRepositoryLocal[id]
  }

  public async createGame (data: GameCreate): Promise<Game> {
    let newGame = new Game()

    newGame = {
      ...data,
      id: this.generateUUID()
    }

    await this.addGameToRepository(newGame)
    return newGame
  }

  private async addGameToRepository (data: Game): Promise<GameRepository> {
    this.gameRepositoryLocal[data.id] = data
    return this.gameRepositoryLocal
  }

  private generateUUID (): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
}
