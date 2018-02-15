import { Injectable } from '@angular/core';
import { MpBox } from '../mp-box/mp-box';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { MpGameLevel } from './mp-game-level';
import { MpGameStatus } from './mp-game-status';
import { MpBoxStatus } from '../mp-box/mp-box-status';
import { MpGame } from './mp-game';
import { Player } from './mp-player';

@Injectable()
export class MpGameService {

  constructor(){}

  generateGame(level : string, player: Player) : MpGame {
    let newGame = new MpGame();
    newGame.key = this.generateKey();
    newGame.config = this.loadConfiguration(level);
    newGame.boxes = this.generateBoxes(newGame);
    newGame.minesLeft = newGame.config.mines;
    newGame.players = [];
    player.color = this.getRandomColor();
    player.agree = false;
    player.agree = false;
    player.bombs = 0;
    player.correct = 0;
    player.incorrect = 0;
    newGame.players.push(player);

    return newGame;
  }

  generateKey() {
    return '-xxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private loadConfiguration(level){
    switch(level){
      case MpGameLevel.Beginner:
        return environment.board.beginner;
      case MpGameLevel.Intermediate:
        return environment.board.intermediate;
      case MpGameLevel.Advanced:
        return environment.board.advanced;
      case MpGameLevel.Extreme:
        return environment.board.extreme;
      case MpGameLevel.Insane:
        return environment.board.insane;
    }
  }

  private generateBoxes(game: MpGame): MpBox[][]{
    let arrayBoxes : MpBox[];
    let matrixBoxes : MpBox[][] = [];
    let emptyBoxesCount : number = (game.config.height * game.config.width) - game.config.mines;

    let mineBoxes = this.createArrayBoxes(game.config.mines, true);
    let emptyBoxes =  this.createArrayBoxes(emptyBoxesCount, false);
    arrayBoxes = mineBoxes.concat(emptyBoxes);
    arrayBoxes = this.shuffleBoxes(arrayBoxes);

    matrixBoxes = this.boxesArrayToMatrix(arrayBoxes, game.config.width);
    matrixBoxes = this.putCoordinatesXY(matrixBoxes, game.config.width, game.config.height);
    matrixBoxes = this.putMinesAroundCount(matrixBoxes, game.config.width, game.config.height);

    return matrixBoxes;
  }

  private createArrayBoxes(boxesCount: number, isMine: boolean): MpBox[] {
    let boxes : MpBox[] = [];
    let playerClick : Player = new Player();
    playerClick.color = '';

    for(let i=0; i < boxesCount; i++){
      let box : MpBox = new MpBox();
      box.status = MpBoxStatus.BoxHide;
      box.hasMine = isMine;
      box.playerClick = playerClick;
      boxes.push(box);
    }
    return boxes;
  }

  private shuffleBoxes(boxes: MpBox[]): MpBox[]{          
    for(let i = 0; i < boxes.length; i++) {
      let randomIndex = Math.floor(Math.random()*(i+1)); 
      let itemAtIndex = boxes[randomIndex]; 
      boxes[randomIndex] = boxes[i]; 
      boxes[i] = itemAtIndex;
    }
    return boxes;
  }

  private putCoordinatesXY(boxes: MpBox[][], width : number, height: number): MpBox[][]{
    for(let x=0; x < width; x++){
      for(let y=0; y < height; y++){
        boxes[x][y].x = x;
        boxes[x][y].y = y;
      }
    }
    return boxes;
  }

  private putMinesAroundCount(boxes: MpBox[][], width: number, height: number) : MpBox[][]{
    for(let x=0; x < width; x++){
      for(let y=0; y < height; y++){
        let box : MpBox = boxes[x][y];
        if(!box.hasMine){
          let aroundBoxes : MpBox[] = this.getAroundBoxes(boxes, x, y, width, height);
          for(let i=0; i < aroundBoxes.length; i++){
            if(aroundBoxes[i].hasMine){
              box.minesAround++;
            }
          }
        }
      }
    }
    return boxes;
  }

  getAroundBoxes(boxes: MpBox[][], x: number, y: number, width: number, height: number): MpBox[]{
    let boxesAround : MpBox[] = [];    
    if(this.isXYValid(x-1, y-1, width, height))
      boxesAround.push(boxes[x-1][y-1]);
    if(this.isXYValid(x-1, y, width, height))
      boxesAround.push(boxes[x-1][y]);
    if(this.isXYValid(x-1, y+1, width, height))
      boxesAround.push(boxes[x-1][y+1]);
    if(this.isXYValid(x, y-1, width, height))
      boxesAround.push(boxes[x][y-1]);
    if(this.isXYValid(x, y+1, width, height))
      boxesAround.push(boxes[x][y+1]);
    if(this.isXYValid(x+1, y-1, width, height))
      boxesAround.push(boxes[x+1][y-1]);
    if(this.isXYValid(x+1, y, width, height))
      boxesAround.push(boxes[x+1][y]);
    if(this.isXYValid(x+1, y+1, width, height))
      boxesAround.push(boxes[x+1][y+1]);
    return boxesAround;
  }

  private isXYValid(x: number, y: number, width: number, height: number){
    if(x >= 0 && y >=0 && x < width && y < height)
      return true;
    return false;
  }

  private boxesArrayToMatrix(boxes : MpBox[], width: number): MpBox[][]{
    let rows = [];
    for(let i=0; i < boxes.length; i+=width)
      rows.push(boxes.slice(i, i + width));
    return rows;
  }

  boxClicked(game: MpGame, x: number, y: number, player: Player){
    let boxClicked = game.boxes[x][y];
    if(boxClicked.status == MpBoxStatus.BoxHide){
      if(!boxClicked.hasMine){
        if(boxClicked.minesAround == 0){
          let aroundBoxes = this.getAroundBoxes(game.boxes, boxClicked.x, boxClicked.y, game.config.width, game.config.height);
          this.openAround(game, aroundBoxes, boxClicked);
        }
        else{
          this.openSimple(boxClicked);
        }
      }
      else{
        game.minesLeft--;
        boxClicked.playerClick = player;
        boxClicked.playerClick.bombs++;
        boxClicked.status = MpBoxStatus.BoxBomb;
      }
      this.isGameFinish(game);
    }
  }

  putFlag(game: MpGame, x: number, y: number, player: Player){
    let boxClicked = game.boxes[x][y];
    if(boxClicked.status == MpBoxStatus.BoxHide){
      if(boxClicked.hasMine){
        boxClicked.playerClick = player;
        boxClicked.status = MpBoxStatus.BoxFlag;
        player.correct++;
        game.minesLeft--;
      }
      else{
        boxClicked.playerClick = new Player();
        boxClicked.playerClick.color = '';
        boxClicked.status = MpBoxStatus.BoxShow;
        player.incorrect++;
      }
    }
    this.isGameFinish(game);
  }

  openAround(game : MpGame, aroundBoxes: MpBox[], box: MpBox){
    let player = new Player();
    player.color = '';
    box.playerClick = player;
    box.status = MpBoxStatus.BoxShow;
    for(let i=0; i < aroundBoxes.length; i++){
      let boxToInspect = aroundBoxes[i];
      if(boxToInspect.minesAround == 0 && boxToInspect.status == MpBoxStatus.BoxHide){
        let boxesToInspect = this.getAroundBoxes(game.boxes, boxToInspect.x, boxToInspect.y, game.config.width, game.config.height);
        this.openAround(game, boxesToInspect, boxToInspect);
      }
      if(boxToInspect.minesAround > 0 && boxToInspect.status == MpBoxStatus.BoxHide){
        boxToInspect.status = MpBoxStatus.BoxShow;
      }
    }
  }

  openSimple(box: MpBox){
    let player = new Player();
    player.color = '';
    box.playerClick = player;
    box.status = MpBoxStatus.BoxShow;
  }

  isGameFinish(game: MpGame){
    if(game.minesLeft == 0){
      game.gameStatus = MpGameStatus.Finished;

    }
  }

  openEmpty(game: MpGame){
    for(let i=0; i < game.config.width; i++){
      for(let j=0; j< game.config.height; j++){
        let box = game.boxes[i][j];
        if(box.status == MpBoxStatus.BoxHide && !box.hasMine){
          box.status = MpBoxStatus.BoxShow;
        }
      }
    }
  }
}

