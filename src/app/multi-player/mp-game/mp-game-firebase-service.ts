import { Injectable } from '@angular/core';
import { MpBox } from '../mp-box/mp-box';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { MpGameLevel } from './mp-game-level';
import { MpGameStatus } from './mp-game-status';
import { MpBoxStatus } from '../mp-box/mp-box-status';
import { MpGame } from './mp-game';
import { Player } from './mp-player';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Injectable()
export class MpGameFirebaseService {

    private games: Observable<MpGame[]>;
    private gamesRef: AngularFireList<MpGame[]>;

    private game: Observable<MpGame>;
    private gameRef: AngularFireObject<MpGame>;

    constructor(private db: AngularFireDatabase){
        this.gamesRef = this.db.list('games');
        this.games = this.gamesRef.snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
    }

    add(game){
        this.gamesRef.set(game.key, game);
    }

    join(gameKey): Observable<MpGame>{
        this.gameRef = this.db.object(`games/${gameKey}`);
        this.game = this.gameRef.snapshotChanges().map(c => {
            return { key: c.payload.key, ...c.payload.val() };
        });
        return this.game;
    }

    getGame(){
        return this.game;
    }

    getGames(){
        return this.games;
    }

}
