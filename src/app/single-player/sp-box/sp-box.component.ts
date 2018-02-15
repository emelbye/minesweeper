import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SpBox } from './sp-box';

@Component({
  selector: 'app-sp-box',
  templateUrl: './sp-box.component.html'
})
export class SpBoxComponent implements OnInit {

  @Input() box : SpBox;
  @Output() onBoxClicked = new EventEmitter();
  @Output() onBoxRightClicked = new EventEmitter();

  classMinesAround : string = '';

  boxClicked(){
    this.onBoxClicked.emit(this.box);
    return false;
  }

  onRightClick(){
    this.onBoxRightClicked.emit(this.box);
    return false;
  }

  ngOnInit() {
    this.classMinesAround = 'mine_' + this.box.minesAround;
  }
}
