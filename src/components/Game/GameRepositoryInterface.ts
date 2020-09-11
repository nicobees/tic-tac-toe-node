import { GameCreate, Game } from './Game'

export interface GameRepositoryInterface {
  createGame(data: GameCreate): Promise<Game>
  getGame(id: Game['id']): Promise<Game>
}
