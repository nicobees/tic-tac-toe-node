import { PlayerData } from '../Player'

export interface GameDataCreate {
  players: Record<PlayerData['id'], PlayerData>,
  board: number[][],
  multiPlayer: boolean,
  nextMove: PlayerData['id']
}

export interface GameData extends GameDataCreate {
  id: string
}

export interface GameMove {
  move: number[]
}

export interface GameInterface {
  getId(): GameData['id'];
  getPlayers(): GameData['players'];
  getBoard(): GameData['board'];
  getNextMove (): GameData['nextMove'];
  setPlayers(players: GameData['players']): void;
  setBoard(board: GameData['board']): void;
  setNextMove (nextMove: GameData['nextMove']): void;
  isJoinable (): boolean;
  availableSymbol (): PlayerData['symbol'];
  // eslint-disable-next-line no-use-before-define
  addPlayer (player: PlayerData): Game;
  // eslint-disable-next-line no-use-before-define
  addMove (player: PlayerData, move: GameMove['move']): Game;
}

export class Game implements GameData, GameInterface {
  public players!: GameData['players']
  public board!: GameData['board']
  public nextMove!: GameData['nextMove']

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

  public getNextMove (): Game['nextMove'] {
    return this.nextMove
  }

  public setNextMove (nextMove: GameData['nextMove']): void {
    this.nextMove = nextMove
  }

  public isJoinable (): boolean {
    if (Object.keys(this.players).length >= 2) {
      return false
    }
    return true
  }

  public availableSymbol (): PlayerData['symbol'] {
    if (Object.keys(this.players).length === 0) {
      return 1
    } else if (Object.keys(this.players).length === 1) {
      return 2
    } else {
      throw new Error(`Available symbol - Can not assign an available symbol - Game id: [${this.id}]`)
    }
  }

  public addPlayer (player: PlayerData): Game {
    if (!this.isJoinable()) {
      throw new Error(`BadRequest - Add player - Sorry, can not join the game - Game id: [${this.id}]`)
    }

    if (this.nextMove === '' && player.symbol === 1) {
      this.setNextMove(player.id)
    }

    this.players[player.id] = player
    return this
  }

  public addMove (player: PlayerData, move: GameMove['move']): Game {
    if (!this.isPlayerValidToMove(player)) {
      throw new Error(`BadRequest - Add move - Player can not move in this game - Game id: [${this.id}]`)
    }

    if (!this.isMoveValid(move)) {
      throw new Error(`BadRequest - Add move - Move is not valid - Game id: [${this.id}]`)
    }

    this.addBoardValue(move, player.symbol)
    const nextPlayerArray = Object.keys(this.players).find((id) => id !== player.id)
    if (!nextPlayerArray) {
      throw new Error(`Error - Add move - unable to find next player - Game id: [${this.id}]`)
    }

    this.setNextMove(this.players[nextPlayerArray].id)

    return this
  }

  private getBoardValue (move: GameMove['move']): number {
    return this.board[move[0]][move[1]]
  }

  private addBoardValue (move: GameMove['move'], symbol: PlayerData['symbol']): Game['board'] {
    this.board[move[0]][move[1]] = symbol
    return this.board
  }

  private isPlayerValidToMove (player: PlayerData): boolean {
    if (!this.getPlayers()[player.id]) {
      console.info('player data 1: ', player)
      return false
    }
    if (this.getNextMove() !== player.id) {
      console.info('player data 2: ', player)
      return false
    }
    return true
  }

  private isMoveValid (move: GameMove['move']): boolean {
    // coordinates validity
    if (!move.length || move.length !== 2) {
      return false
    }
    const coordinates = [0, 1, 2]
    const validCoordinates = move.reduce((prev, coordinate) => {
      return prev && coordinates.includes(coordinate)
    }, true)
    if (!validCoordinates) {
      return false
    }

    // position validity: if board has already a move in the coordinate, then current move is invalid
    const currentBoardValue = this.getBoardValue(move)
    if ([1, 2].includes(currentBoardValue)) {
      return false
    }
    return true
  }
}

// export class Game extends GameCreate {
//   id!: string;

//   constructor(public players: GameData['players'], public board: GameData['board']) {
//     super(players, board)
//   }
// }
