export interface ControllerInterface {
  getName(): string
}

export default abstract class Controller implements ControllerInterface {
  constructor (private name: string) {

  }

  public getName (): Controller['name'] {
    return this.name
  }
}
