import { MpBoxStatus } from "./mp-box-status";
import { Player } from "../mp-game/mp-player";

export class MpBox {
    x: number;
    y: number;
    
    hasMine: boolean;
    minesAround: number = 0;
    status = MpBoxStatus.BoxHide;
    playerClick: Player;
}
