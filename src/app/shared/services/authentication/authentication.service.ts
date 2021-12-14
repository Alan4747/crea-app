import { Injectable, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../api/api.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'FAKE_JWT_TOKEN';
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get token(): any {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private apiService: ApiService, private router: Router) {
    this._isLoggedIn$.next(!!this.token);
  }

  login(username: string, password: string) {
    return this.apiService.login(username, password).pipe(
      tap((response: any) => {        
        this._isLoggedIn$.next(true);
        localStorage.setItem(this.TOKEN_NAME, response.token);
      })
    );
  }

  signOut(): Observable<any> {
    localStorage.clear();
    this._isLoggedIn$.next(false);
    this.router.navigate(['login']);
    return of(true);
  }
}
