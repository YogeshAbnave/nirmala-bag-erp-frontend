import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../_services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor (private _commonService: CommonService, private router: Router) { }
  
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     if (this._commonService.getSession() && this._commonService.getSession().token) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivateChild {

  constructor(private _commonService: CommonService, private router: Router) { }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this._commonService.getSession() && this._commonService.getSession().token) {
        this.router.navigate(['/dashboard']);
        return false;
      } else return true;
  }

}

@Injectable({
  providedIn: 'root'
})
export class SignupGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
        this.router.navigate(['/login']);
        return false;
  }

}
