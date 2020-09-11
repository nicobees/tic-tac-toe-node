import { GameData } from './Game'

export interface GameRepositoryInterface {
  createGame(multiPlayer: GameData['multiPlayer']): Promise<GameData>;
  getGame(id: GameData['id']): Promise<GameData>;
}
