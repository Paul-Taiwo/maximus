import { Injectable } from '@angular/core';
import { AngularFireLiteAuth, AngularFireLiteFirestore } from 'angularfire-lite';
import { Subject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FbService {

  constructor(private auth: AngularFireLiteAuth, private fireLiteStore: AngularFireLiteFirestore) {}

  getCities():any {
    return this.auth.uid().pipe(switchMap((uid) => {
      return this.fireLiteStore.read(`${uid}`);
    }));
  }

  addCity(name: string) {
    return this.auth.uid().pipe(switchMap((uid) => {
      return this.fireLiteStore.write(`${uid}/${name}`, {
        name, 
        added: new Date(),
      })
    }));
  }

  isAuth(): Subject<any> {
    return this.auth.isAuthenticated()
  }

  signin(email: string, password: string):Observable<any> {
    return this.auth.signin(email, password)
  }

  signup(email: string, password: string):Observable<any> {
    return this.auth.signup(email, password)
  }

  userData(): Subject<any> | Observable<any> {
    return this.auth.userData();
  }

  logout(): Observable<any> {
    return this.auth.signout();
  }
}
