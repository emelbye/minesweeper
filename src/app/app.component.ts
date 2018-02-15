import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  public isLoggedIn: boolean;

  constructor(private router: Router) {
  //constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.isLoggedIn = true;
    this.router.navigate(['']);

    /* TODO: Activate only for Multiplayer mode.
    this.afAuth.authState.subscribe(
      (user) => {
        if(user == null) {
          this.isLoggedIn = false;
          this.router.navigate(['login']);
        }
        else {
          this.isLoggedIn = true;
          this.router.navigate(['']);
        }
      }
    );
    */
  }

  logout() {
    //this.afAuth.auth.signOut();
  }

  private themes : string[] = [
    'default-theme',
    'dark-theme',
    'blue-theme'
  ]

  ngOnInit(): void {
    this.setTheme('default-theme');
  }

  setTheme(theme){
    for(let i=0; i < this.themes.length; i++)
      document.querySelectorAll('body')[0].classList.remove(this.themes[i]);

    document.querySelectorAll('body')[0].classList.add(theme);
  }
}
