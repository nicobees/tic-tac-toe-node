import { GameData } from './Game'
import { PlayerData } from '../Player'

export interface GameRepositoryInterface {
  createGame(multiPlayer: GameData['multiPlayer']): Promise<GameData>;
  getGame(id: GameData['id']): Promise<GameData>;
  addPlayerToGame (id: GameData['id'], player: PlayerData, nextMove: GameData['nextMove']): Promise<GameData>;
  addMoveToGame (id: GameData['id'], data: GameData): Promise<GameData>;
}
