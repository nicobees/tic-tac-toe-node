import { Game, GameData } from './Game'
import { GameRepositoryInterface } from './GameRepository'
import { PlayerData } from '../Player'

type GameRepository = Record<Game['id'], GameData>

export class GameLocalRepository implements GameRepositoryInterface {
  constructor (private gameRepositoryLocal: GameRepository = {}) {
    this.gameRepositoryLocal = {
      // '0001': {
      //   id: '0001',
      //   players: {},
      //   board: '---00X--X',
      //   multiPlayer: false
      // }
    }
  }

  public async createGame (multiPlayer = false): Promise<GameData> {
    const newID = this.generateUUID()
    const players: Record<PlayerData['id'], PlayerData> = {}
    const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    const nextMove = ''
    const newGameData = {
      id: newID,
      players,
      board,
      multiPlayer,
      nextMove
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

  public async addPlayerToGame (id: GameData['id'], player: PlayerData, nextMove: GameData['nextMove']): Promise<GameData> {
    this.gameRepositoryLocal[id].players[player.id] = player
    this.gameRepositoryLocal[id].nextMove = nextMove
    return await this.gameRepositoryLocal[id]
  }

  public async addMoveToGame (id: GameData['id'], data: GameData): Promise<GameData> {
    this.gameRepositoryLocal[id].board = data.board
    this.gameRepositoryLocal[id].nextMove = data.nextMove
    return await this.gameRepositoryLocal[id]
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
