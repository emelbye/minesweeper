import { SpBox } from "../sp-box/sp-box";

export class SpGame {
    
    minesLeft: number = 0;
    gameStatus: string;
    boxes: SpBox[][] = [];
    
    config = {
      width: 10,
      height: 10,
      mines: 20
    }
}
