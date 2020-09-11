import Controller from '../../core/Controller'
import { Game, GameCreate } from './Game'
import { GameRepositoryInterface } from './GameRepositoryInterface'

export interface GameControllerInterface {
  createGame(data: GameCreate): Promise<Game>
  getGame(id: Game['id']): Promise<Game>
  getGameHistory(): string
}

export default class GameController extends Controller<Game> /* implements GameControllerInterface */ {
  readonly context = 'Game'
  readonly controllerName = 'game'

  constructor (private gameRepository: GameRepositoryInterface, controllerName = 'game') {
    super(controllerName)
  }

  /**********************************************
   * PUBLIC ROUTES FUNCTIONS - START
   **********************************************/

  public async getGame (id: Game['id']): Promise<Game> {
    // retrieve data from repository
    return await this.gameRepository.getGame(id)
  }

  public async createGame (data: Game): Promise<Game> {
    // use repository to store data about the new Game
    return await this.gameRepository.createGame(data)
  }

  public getGameHistory (): string {
    return 'GameHistory test'
  }

  /**********************************************
   * PUBLIC ROUTES FUNCTIONS - END
   **********************************************/

  /**********************************************
   * PUBLIC FUNCTIONS - START
   **********************************************/

  /**********************************************
   * PUBLIC FUNCTIONS - END
   **********************************************/

  /**********************************************
   * PRIVATE FUNCTIONS - START
   **********************************************/

  /**********************************************
   * PRIVATE FUNCTIONS - END
   **********************************************/
}
