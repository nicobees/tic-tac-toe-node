export interface GameDataCreate {
  players: string[],
  board: string,
  multiPlayer: boolean
}

export interface GameData extends GameDataCreate {
  id: string
}

export interface GameInterface {
  getId(): GameData['id'];
  getPlayers(): GameData['players'];
  getBoard(): GameData['board'];
  setPlayers(players: GameData['players']): void;
  setBoard(board: GameData['board']): void;
}

export class Game implements GameData, GameInterface {
  public players!: GameData['players']
  public board!: GameData['board']

  constructor (public id: GameData['id'], public multiPlayer: boolean = false) {

  }

  public getId (): GameData['id'] {
    return this.id
  }

  public getPlayers (): GameData['players'] {
    return this.players
  }

  public getBoard (): GameData['board'] {
    return this.board
  }

  public setPlayers (players: GameData['players']): void {
    this.players = players
  }

  public setBoard (board: GameData['board']): void {
    this.board = board
  }
}

// export class Game extends GameCreate {
//   id!: string;

//   constructor(public players: GameData['players'], public board: GameData['board']) {
//     super(players, board)
//   }
// }
