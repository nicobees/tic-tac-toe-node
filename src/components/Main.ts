import Controller from '../core/Controller'

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
