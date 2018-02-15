import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SpBox } from '../sp-box/sp-box';
import { SpGame } from './sp-game';
import { SpGameService } from './sp-game.service';
import { SpGameLevel } from './sp-game-level';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { SpGameStatus } from './sp-game-status';

@Component({
  selector: 'app-sp-game',
  templateUrl: './sp-game.component.html',
  styleUrls: ['./sp-game.component.scss']
})
export class SpGameComponent implements OnInit {

  game : SpGame;
  level : string;

  constructor(private spGameService : SpGameService){}

  ngOnInit() {
    this.level = SpGameLevel.Beginner;
    this.startGame();
  }

  startGame(){
    this.game = this.spGameService.startGame(this.level);
  }

  onBoxClicked(boxParam : SpBox){
    this.spGameService.boxClicked(this.game, boxParam.x, boxParam.y);
    this.checkGameStatus();
  }

  onBoxRightClicked(boxParam : SpBox){
    this.spGameService.putFlag(this.game, boxParam.x, boxParam.y);
    this.checkGameStatus();
  }

  checkGameStatus(){
    if(this.game.gameStatus == SpGameStatus.Finished)
      alert('Congratulations!!!!!');
    if(this.game.gameStatus == SpGameStatus.GameOver)
      alert('Game Over :(');
  }

}
