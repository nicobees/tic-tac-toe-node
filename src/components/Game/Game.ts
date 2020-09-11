export class GameCreate {
  players!: string[];
  board!: string
}

export class Game extends GameCreate {
  id!: string;
}
