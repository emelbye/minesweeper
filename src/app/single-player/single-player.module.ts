import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpGameComponent } from './sp-game/sp-game.component';
import { SpGameService } from './sp-game/sp-game.service';
import { FormsModule } from '@angular/forms';
import { SpBoxComponent } from './sp-box/sp-box.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SpGameComponent,
    SpBoxComponent
  ],
  providers: [
    SpGameService
  ],
  exports: [
    SpGameComponent,
    SpBoxComponent
  ]
})
export class SinglePlayerModule { }
