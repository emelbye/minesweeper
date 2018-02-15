import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { SinglePlayerModule } from './single-player/single-player.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { MultiPlayerModule } from './multi-player/multi-player.module';
import { AngularFireAuth } from 'angularfire2/auth';
//import { LoginComponent } from './multi-player/mp-login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    //LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SinglePlayerModule,
    //MultiPlayerModule,
    RouterModule.forRoot(
      routes, { useHash: false }
    )
  ],
  providers: [
    //AngularFireAuth TODO: Only for multiplayer mode
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
