import { Game, GameData } from './Game'
import { GameRepositoryInterface } from './GameRepository'

type GameRepository = Record<Game['id'], GameData>

export class GameLocalRepository implements GameRepositoryInterface {
  constructor (private gameRepositoryLocal: GameRepository = {}) {
    this.gameRepositoryLocal = {
      '0001': {
        id: '0001',
        players: ['Player1', 'Player2'],
        board: '---00X--X',
        multiPlayer: false
      }
    }
  }

  public async createGame (multiPlayer = false): Promise<GameData> {
    const newID = this.generateUUID()
    const players: string[] = []
    const board = ''
    const newGameData = {
      id: newID,
      players,
      board,
      multiPlayer
    }

    await this.addGameToRepository(newGameData)
    return newGameData
  }

  public async getGame (id: GameData['id']): Promise<GameData> {
    if (!this.gameRepositoryLocal[id]) {
      throw new Error(`NotFound - Game - id: [${id}]`)
    }

    const gameData = await this.gameRepositoryLocal[id]

    return gameData
  }

  private async addGameToRepository (data: GameData): Promise<GameRepository> {
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
