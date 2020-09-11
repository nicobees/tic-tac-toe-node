import Controller from '../core/Controller'
import { GameLocalRepository, GameController } from './Game'
import { PlayerController } from './Player'

type Controllers = Record<string, Controller>

interface MainInterface {
  init(): Promise<void>;
  getControllers(): Controllers
  getControllerByName (name: string): Controller
}

class Main implements MainInterface {
  private controllers: Controllers = {}

  constructor () {
    console.info()
  }

  public async init (): Promise<void> {
    // Connect to database: currently no database connection is needed

    // Instantiate all components and their relative routes

    const playerController = new PlayerController()

    const gameRepository = new GameLocalRepository()
    // const gameRepositoryMock = new GameRepositoryMock()
    const gameController = new GameController(gameRepository, playerController)

    this.controllers[gameController.getName()] = gameController

    // api: new-game --> gameId
    const newGame = await gameController.startNewGame(false)
    console.info('created new game')

    // api: join-game/:id/:playerName --> playerId
    const playerIdFirst = await gameController.joinGame(newGame.id, 'player-1')

    // api: join-game/:id/:playerName --> playerId
    const playerIdSecond = await gameController.joinGame(newGame.id, 'player-2')

    console.info('player IDs after join: ', playerIdFirst, playerIdSecond)

    // api: get-game/:id
    const game = await gameController.getGameApi(newGame.id)
    console.info('get game after join: ', game)

    // api: add-move/:id/:move --> Game['board']
    const firstMoveResult = await gameController.addGameMove(game.id, game.players[Object.keys(game.players)[0]], [0, 0])
    console.info('first move result: ', firstMoveResult)

    // api: get-game/:id
    const gameFirstMove = await gameController.getGameApi(newGame.id)
    console.info('get game after first move: ', gameFirstMove)

    // api: add-move/:id/:move --> Game['board']
    const secondMoveResult = await gameController.addGameMove(game.id, game.players[Object.keys(game.players)[1]], [1, 1])
    console.info('second move result: ', secondMoveResult)

    // api: get-game/:id
    const gameSecondMove = await gameController.getGameApi(newGame.id)
    console.info('get game after second move: ', gameSecondMove)

    console.info('Main Component initialised')
  }

  public getControllers (): Controllers {
    return this.controllers
  }

  public getControllerByName (name: string): Controller {
    if (!this.controllers[name]) {
      throw new Error(`NotFound - Controller - ${name}`)
    }
    return this.controllers[name]
  }
}

export default Main
