import Controller from '../core/Controller'
import { GameLocalRepository, GameController } from './Game'

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

    const gameRepository = new GameLocalRepository()
    // const gameRepositoryMock = new GameRepositoryMock()
    const gameController = new GameController(gameRepository)

    this.controllers[gameController.getName()] = gameController

    const newGame = await gameController.startNewGame(false)
    console.info('created new game: ', newGame)

    const getGame = await gameController.getGame(newGame.id)
    console.info('get game: ', getGame, getGame.getId())

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
