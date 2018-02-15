import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MpBox } from './mp-box';
import { Player } from '../mp-game/mp-player';

@Component({
  selector: 'app-mp-box',
  templateUrl: './mp-box.component.html'
})
export class MpBoxComponent implements OnInit {

  @Input() box : MpBox;
  @Output() onBoxClicked = new EventEmitter();
  @Output() onBoxRightClicked = new EventEmitter();

  classMinesAround : string = '';
  borderColor: string = '';

  boxClicked(){
    this.onBoxClicked.emit(this.box);
    this.borderColor = this.box.playerClick.color;
    return false;
  }

  onRightClick(){
    this.onBoxRightClicked.emit(this.box);
    this.borderColor = this.box.playerClick.color;
    return false;
  }

  ngOnInit() {
    this.classMinesAround = 'mine_' + this.box.minesAround;
  }
}
