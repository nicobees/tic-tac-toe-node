import Controller from '../../core/Controller'
import { PlayerData, PlayerDataCreate } from '../Player'

export interface PlayerControllerInterface {
  createNewPlayer(name: PlayerData['name'], isComputer: PlayerData['isComputer']): PlayerDataCreate;
}

export default class PlayerController extends Controller implements PlayerControllerInterface {
  readonly context = 'Player'
  readonly controllerName = 'player'

  constructor (controllerName = 'player') {
    super(controllerName)
  }

  /**********************************************
   * PUBLIC ROUTES FUNCTIONS - START
   **********************************************/
  public createNewPlayer (name: PlayerData['name'], isComputer: PlayerData['isComputer'] = false): PlayerDataCreate {
    const newID = this.generateUUID()
    const newPlayer = {
      id: newID,
      name,
      isComputer
    }

    return newPlayer
  }

  private generateUUID (): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
}
