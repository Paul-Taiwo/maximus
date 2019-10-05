import { Component, OnInit, OnDestroy } from '@angular/core';
import { UiService } from './services/ui/ui.service';
import { Location } from '@angular/common';
import { FbService } from './services/firebase/fb.service';
import { first, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'maximus';
  showMenu: boolean = false;
  darkModeActive: boolean;
  userEmail: string;
  darkModeSub: any;

  constructor(public ui: UiService, private fb: FbService, private router: Router, private activeRoute: Location) {

  }

  toggleMenu():void {
    this.showMenu = !this.showMenu
  }

  ngOnInit():void {
    this.darkModeSub = this.ui.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    });

    this.fb.userData().pipe().subscribe((data) => {
      this.userEmail = data.email;
    })
  }

  checkURL() {
    if (this.activeRoute.path() === '/signup' || this.activeRoute.path() === '/login') {
      return false;
    } else {
      return true;
    }
  }

  modeToggleSwitch():void {
    this.ui.darkModeState.next(!this.darkModeActive)
  }

  logout():void {
    this.fb.logout().pipe(first()).subscribe(() => {
      // Redirect user to login page
      this.router.navigateByUrl('login')
    })
  }

  ngOnDestroy() {
    this.darkModeSub.unsubscribe()
  }
}
