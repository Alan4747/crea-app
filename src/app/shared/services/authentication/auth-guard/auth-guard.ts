import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,

  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authenticationService.isLoggedIn$.pipe(
      tap((isLoggedIn) => {
        
        if(state.url === '/login' && isLoggedIn){
          this.router.navigate(['list']);
        }
        if (!isLoggedIn) {
          this.router.navigate(['login']);
        }
      })
    );
  }
}
