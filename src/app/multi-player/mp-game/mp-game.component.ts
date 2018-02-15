import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MpBox } from '../mp-box/mp-box';
import { MpGame } from './mp-game';
import { MpGameService } from './mp-game.service';
import { MpGameLevel } from './mp-game-level';
import { MpGameStatus } from './mp-game-status';
import { Player } from './mp-player';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { MpBoxStatus } from '../mp-box/mp-box-status';
import 'rxjs/add/operator/take';
import { MpGameFirebaseService } from './mp-game-firebase-service';

@Component({
  selector: 'app-mp-game',
  templateUrl: './mp-game.component.html',
  styleUrls: ['./mp-game.component.scss']
})
export class MpGameComponent implements OnInit {

  level : string;
  gameKey : string;
  player: Player;

  game: MpGame;

  constructor(private mpGameService: MpGameService, private mpGameFirebaseService: MpGameFirebaseService){}

  ngOnInit(): void {
    this.player = new Player();
    this.player.color = '';
    this.player.name = 'Emiliano Verazay ' + new Date().toString();

    this.level = MpGameLevel.Beginner;
  }

  startGame(){
    let game : any = this.mpGameService.generateGame(this.level, this.player);
    this.mpGameFirebaseService.add(game);
    this.joinGame(true);
  }

  joinGame(owner: boolean){
    console.log('joinGame');
    this.mpGameFirebaseService.join(this.gameKey).subscribe(game => {
      console.log('join suscription');
      if(!owner){
        this.player.color = this.mpGameService.getRandomColor();
        this.player.agree = false;
        game.players.push(this.player);
      }
      this.game = game;
    });
  }

  onBoxClicked(boxParam : MpBox){
    console.log('boxClicked', boxParam);
    this.mpGameFirebaseService.getGame().take(1).subscribe(game => {
      console.log('game subscription', game);
      let boxClicked = game.boxes[boxParam.x][boxParam.y];
      if(boxClicked.status == MpBoxStatus.BoxHide){
        if(!boxClicked.hasMine){
          if(boxClicked.minesAround == 0){
            let aroundBoxes = this.mpGameService.getAroundBoxes(game.boxes, boxClicked.x, boxClicked.y, game.config.width, game.config.height);
            this.mpGameService.openAround(game, aroundBoxes, boxClicked);
          }
          else{
            this.mpGameService.openSimple(boxClicked);
          }
        }
        else{
          game.minesLeft--;
          boxClicked.playerClick = this.player;
          boxClicked.playerClick.bombs++;
          boxClicked.status = MpBoxStatus.BoxBomb;
        }
        this.mpGameService.isGameFinish(game);
      }
    });
  }

    /*if(this.game.gameStatus != MpGameStatus.Finished){
      this.mpGameService.boxClicked(this.game, boxParam.x, boxParam.y, this.player);
      this.checkGameStatus();
    }*/
  

  onBoxRightClicked(boxParam : MpBox){
    /* if(this.game.gameStatus != MpGameStatus.Finished){
      this.mpGameService.putFlag(this.game, boxParam.x, boxParam.y, this.player);
      this.checkGameStatus();
    } */
  }

  checkGameStatus(){
    /* if(this.game.gameStatus == MpGameStatus.Finished){
      this.mpGameService.openEmpty(this.game);
      alert('Congratulations!!!!!');
    } */
  }

}
