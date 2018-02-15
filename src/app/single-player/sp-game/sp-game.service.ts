import { Injectable } from '@angular/core';
import { SpBox } from '../sp-box/sp-box';
import { Observable } from 'rxjs/Observable';
import { SpGame } from './sp-game';
import { environment } from '../../../environments/environment';
import { SpGameLevel } from './sp-game-level';
import { SpGameStatus } from './sp-game-status';
import { SpBoxStatus } from '../sp-box/sp-box-status';

@Injectable()
export class SpGameService {

  public startGame(level : string) : SpGame {
    let game = new SpGame();
    game.gameStatus = SpGameStatus.InCurse;
    game.config = this.loadConfiguration(level);
    game.boxes = this.generateBoxes(game);
    game.minesLeft = game.config.mines;
    return game;
  }

  private loadConfiguration(level){
    switch(level){
      case SpGameLevel.Beginner:
        return environment.board.beginner;
      case SpGameLevel.Intermediate:
        return environment.board.intermediate;
      case SpGameLevel.Advanced:
        return environment.board.advanced;
      case SpGameLevel.Extreme:
        return environment.board.extreme;
      case SpGameLevel.Insane:
        return environment.board.insane;
    }
  }

  private generateBoxes(game: SpGame): SpBox[][]{
    let arrayBoxes : SpBox[];
    let matrixBoxes : SpBox[][] = [];
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

  private createArrayBoxes(boxesCount: number, isMine: boolean): SpBox[] {
    let boxes : SpBox[] = [];
    for(let i=0; i < boxesCount; i++){
      let box : SpBox = new SpBox();
      box.status = SpBoxStatus.BoxHide;
      box.hasMine = isMine;
      boxes.push(box);
    }
    return boxes;
  }

  private shuffleBoxes(boxes: SpBox[]): SpBox[]{          
    for(let i = 0; i < boxes.length; i++) {
      let randomIndex = Math.floor(Math.random()*(i+1)); 
      let itemAtIndex = boxes[randomIndex]; 
      boxes[randomIndex] = boxes[i]; 
      boxes[i] = itemAtIndex;
    }
    return boxes;
  }

  private putCoordinatesXY(boxes: SpBox[][], width : number, height: number): SpBox[][]{
    for(let x=0; x < width; x++){
      for(let y=0; y < height; y++){
        boxes[x][y].x = x;
        boxes[x][y].y = y;
      }
    }
    return boxes;
  }

  private putMinesAroundCount(boxes: SpBox[][], width: number, height: number) : SpBox[][]{
    for(let x=0; x < width; x++){
      for(let y=0; y < height; y++){
        let box : SpBox = boxes[x][y];
        if(!box.hasMine){
          let aroundBoxes : SpBox[] = this.getAroundBoxes(boxes, x, y, width, height);
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

  private getAroundBoxes(boxes: SpBox[][], x: number, y: number, width: number, height: number): SpBox[]{
    let boxesAround : SpBox[] = [];    
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

  private boxesArrayToMatrix(boxes : SpBox[], width: number): SpBox[][]{
    let rows = [];
    for(let i=0; i < boxes.length; i+=width)
      rows.push(boxes.slice(i, i + width));
    return rows;
  }

  public boxClicked(game: SpGame, x: number, y: number){
    let boxClicked = game.boxes[x][y];
    if(boxClicked.status == SpBoxStatus.BoxHide){
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
        this.gameOver(game, boxClicked);
      }
      this.isGameFinish(game);
    }
  }

  public putFlag(game: SpGame, x: number, y: number){
    let boxClicked = game.boxes[x][y];
    if(boxClicked.status == SpBoxStatus.BoxHide){
      boxClicked.status = SpBoxStatus.BoxFlag;
      game.minesLeft--;
    }
    else{
      if(boxClicked.status == SpBoxStatus.BoxFlag){
        boxClicked.status = SpBoxStatus.BoxHide;
        game.minesLeft++
      }
    }
    this.isGameFinish(game);
  }

  private openAround(game : SpGame, aroundBoxes: SpBox[], box: SpBox){
    box.status = SpBoxStatus.BoxShow;
    for(let i=0; i < aroundBoxes.length; i++){
      let boxToInspect = aroundBoxes[i];
      if(boxToInspect.minesAround == 0 && boxToInspect.status == SpBoxStatus.BoxHide){
        let boxesToInspect = this.getAroundBoxes(game.boxes, boxToInspect.x, boxToInspect.y, game.config.width, game.config.height);
        this.openAround(game, boxesToInspect, boxToInspect);
      }
      if(boxToInspect.minesAround > 0 && boxToInspect.status == SpBoxStatus.BoxHide){
        boxToInspect.status = SpBoxStatus.BoxShow;
      }
    }
  }

  private openSimple(box: SpBox){
    box.status = SpBoxStatus.BoxShow;
  }

  private gameOver(game: SpGame, box: SpBox){
    box.status = SpBoxStatus.BoxBomb;
    game.gameStatus = SpGameStatus.GameOver;
    for(let i=0; i < game.config.width; i++){
      for(let j=0; j< game.config.height; j++){
        if(game.boxes[i][j].hasMine){
          game.boxes[i][j].status = SpBoxStatus.BoxBomb;
        }
      }
    }
  }

  private isGameFinish(game: SpGame){
    let boxesOk = 0;
    for(let i=0; i < game.config.width; i++){
      for(let j=0; j < game.config.height; j++){
        if(game.boxes[i][j].status == SpBoxStatus.BoxFlag && game.boxes[i][j].hasMine){
          boxesOk++;
        }
        if(game.boxes[i][j].status == SpBoxStatus.BoxShow && !game.boxes[i][j].hasMine){
          boxesOk++;
        }
      }
    }
    if((game.config.width * game.config.height) == boxesOk)
      game.gameStatus = SpGameStatus.Finished;
  }

}
