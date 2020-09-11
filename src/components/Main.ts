import { GameLocalRepository, GameController } from './Game'
import Controller from '../core/Controller'

type Controllers = Record<string, Controller<unknown>>

interface Main {
  init(): Promise<void>;
  getControllers(): Controllers
  getController (name: string): Controller
}

class Main implements Main {
  private controllers: Controllers = {}

  constructor () {
    console.info('in Main constructor')
  }

  public async init (): Promise<void> {
    // Connect to database: currently no database connection is needed

    // Instantiate all components and their relative routes

    /**
     * Game Component
     */
    const gameRepository = new GameLocalRepository()
    // const gameRepositoryMock = new GameRepositoryMock()
    const gameController = new GameController(gameRepository)

    this.controllers[gameController.getControllerName()] = gameController
  }

  public getControllers (): Controllers {
    return this.controllers
  }

  public getController (name: string): Controller {
    if (!this.controllers[name]) {
      throw new Error(`NotFound - Controller - ${name}`)
    }
    return this.controllers[name]
  }
}

export default Main
