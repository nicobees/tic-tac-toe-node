export interface PlayerDataCreate {
  id: string;
  name: string;
  isComputer: boolean;
}

export interface PlayerData extends PlayerDataCreate {
  symbol: number;
}
