//import { MpGameComponent } from "./multi-player/mp-game/mp-game.component";
import { SpGameComponent } from "./single-player/sp-game/sp-game.component";

import { Router, Routes } from '@angular/router';
// TODO: Login component only for multiplayer mode
//import { LoginComponent } from "./multi-player/mp-login/login.component";

export const routes: Routes = [
    //{ path: 'login', component: LoginComponent},
    { path: '', redirectTo : 'single-player', pathMatch: 'full' },
    { path: 'single-player', component : SpGameComponent},
    //{ path: 'multi-player', component: MpGameComponent }
];