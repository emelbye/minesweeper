import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MpBoxComponent } from './mp-box/mp-box.component';
import { MpGameService } from './mp-game/mp-game.service';
import { MpGameComponent } from './mp-game/mp-game.component';
import { environment } from '../../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MpGameFirebaseService } from './mp-game/mp-game-firebase-service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  declarations: [
    MpGameComponent,
    MpBoxComponent
  ],
  providers: [
    MpGameService,
    MpGameFirebaseService
  ],
  exports: [
    MpGameComponent,
    MpBoxComponent
  ]
})
export class MultiPlayerModule { }
