import { MpBox } from "../mp-box/mp-box";
import { Player } from "./mp-player";
import { MpGameStatus } from "./mp-game-status";

export class MpGame {
    
    key: string;
    minesLeft: number;
    gameStatus: string;
    boxes: MpBox[][];
    players: Player[];
    date: number;
    config;

    constructor(){
      this.minesLeft = 0;
      this.gameStatus = MpGameStatus.Waiting;
      this.boxes = [];
      this.players = [];
      this.date = new Date().getTime();
      this.config = {
        width: 10,
        height: 10,
        mines: 20
      }
    }
}
