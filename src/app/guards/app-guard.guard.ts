import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FbService } from '../services/firebase/fb.service';
import { map } from 'rxjs/operators';

// App Guard is to stop unauthorised users from accessing core pages

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {

  constructor(private fb: FbService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean  {
    return this.fb.isAuth().pipe(map( auth => {
      if (!!auth) {
        return true
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }));
  }
  
}
