import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckloginGuard implements CanActivate {
  constructor(private fAuth: AngularFireAuth, public router: Router){

  }
  canActivate(): Observable<boolean>{
    return this.fAuth.authState.pipe(
      map(auth=> {
        if(!auth){
          this.router.navigate(['/login']);
          console.log('autenticado:', false);
        return false;
        }
        else{
          console.log('autenticado:', true);
          return true;
        }
      })
    );
}
}