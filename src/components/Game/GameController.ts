import Controller from '../../core/Controller'
import { Game } from './Game'
import { GameRepositoryInterface } from './GameRepository'

export interface GameControllerInterface {
  startNewGame(multiPlayer: boolean): Promise<Game>
  getGame(id: Game['id']): Promise<Game>
  getGameHistory(): string
}

export default class GameController extends Controller implements GameControllerInterface {
  readonly context = 'Game'
  readonly controllerName = 'game'

  constructor (private gameRepository: GameRepositoryInterface, controllerName = 'game') {
    super(controllerName)
  }

  /**********************************************
   * PUBLIC ROUTES FUNCTIONS - START
   **********************************************/
  public async startNewGame (multiPlayer = false): Promise<Game> {
    // use repository to store data about the new Game
    const newGameData = await this.gameRepository.createGame(multiPlayer)

    const newGame = new Game(newGameData.id, newGameData.multiPlayer)

    return newGame
  }

  public async getGame (id: Game['id']): Promise<Game> {
    // retrieve data from repository
    const gameData = await this.gameRepository.getGame(id)

    const game = new Game(gameData.id, gameData.multiPlayer)
    game.setPlayers(gameData.players)
    game.setBoard(gameData.board)

    console.info('inside getGame: ', game.id, game.players, await game.getId(), await game.getPlayers())
    return game
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
