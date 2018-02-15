import { SpBoxStatus } from "./sp-box-status";

export class SpBox {
    x: number;
    y: number;
    
    hasMine: boolean;
    minesAround: number = 0;
    status = SpBoxStatus.BoxHide;
}
