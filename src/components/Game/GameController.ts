import Controller from '../../core/Controller'
import { Game, GameMove } from './Game'
import { GameRepositoryInterface } from './GameRepository'
import { PlayerData } from '../Player'
import { PlayerControllerInterface } from '../Player/PlayerController'

export interface GameControllerInterface {
  startNewGame(multiPlayer: boolean): Promise<Game>
  getGameApi(id: Game['id']): Promise<Game>
  joinGame(id: Game['id'], playerName: PlayerData['name']): Promise<PlayerData['id']>
  addGameMove (id: Game['id'], player: PlayerData, move: GameMove['move']): Promise<Game['board']>
  getGameHistory(): string
}

export default class GameController extends Controller implements GameControllerInterface {
  readonly context = 'Game'
  readonly controllerName = 'game'

  constructor (private gameRepository: GameRepositoryInterface, private playerController: PlayerControllerInterface, controllerName = 'game') {
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

  public async getGameApi (id: Game['id']): Promise<Game> {
    return await this.getGame(id)
  }

  public async joinGame (id: Game['id'], playerName: PlayerData['name']): Promise<PlayerData['id']> {
    const game = await this.getGame(id)

    // check if game is joinable
    if (!game.isJoinable()) {
      throw new Error(`BadRequest - JoinGame - Sorry, can not join the game - id: [${id}]`)
    }

    // create new player data to join the game
    const isComputer = false // currently only multiplayer with "real" users is supported
    const availableSymbol = game.availableSymbol()
    let newPlayer = this.playerController.createNewPlayer(playerName, isComputer)
    newPlayer = {
      ...newPlayer,
      symbol: availableSymbol
    } as PlayerData

    game.addPlayer(newPlayer as PlayerData)

    await this.gameRepository.addPlayerToGame(id, newPlayer as PlayerData, game.getNextMove())

    return newPlayer.id
  }

  public async addGameMove (id: Game['id'], player: PlayerData, move: GameMove['move']): Promise<Game['board']> {
    const game = await this.getGame(id)

    const result = await game.addMove(player, move)

    await this.gameRepository.addMoveToGame(id, result)

    return result.getBoard()
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
  private async getGame (id: Game['id']): Promise<Game> {
    // retrieve data from repository
    const gameData = await this.gameRepository.getGame(id)

    const game = new Game(gameData.id, gameData.multiPlayer)
    game.setPlayers(gameData.players)
    game.setBoard(gameData.board)
    game.setNextMove(gameData.nextMove)

    return game
  }
  /**********************************************
   * PRIVATE FUNCTIONS - END
   **********************************************/
}
