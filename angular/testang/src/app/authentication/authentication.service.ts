import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserModel } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // like subject but also gives access to previous emitted value
  // i.e get data before subscription, should also have an initial value
  user = new BehaviorSubject<UserModel>(null);

  constructor(private http: HttpClient, private router: Router) {}

  // rxjs always needs to return a new observable
  signUp(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.SIGN_UP}${environment.API_KEY}`, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError), tap(this.handleAuthenticationUser));
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.SIGN_IN}${environment.API_KEY}`, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError), tap(this.handleAuthenticationUser));
  }

  logout(): void {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigateByUrl('/login');
  }

  isLoggedIn(): void {
    const userData: {
      email: string;
      id: string;
      token: string;
      tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      const loggedInUser = new UserModel(
        userData.email,
        userData.id,
        userData.token,
        new Date(userData.tokenExpirationDate)
      );
      if (loggedInUser.getToken) {
        this.user.next(loggedInUser);
      }
    }
  }

  private handleAuthenticationUser(response: AuthResponse): void {
    const expirationDate = new Date(
      new Date().getTime() + +response.expiresIn * 1000
    );
    const user = new UserModel(
      response.email,
      response.localId,
      response.idToken,
      expirationDate
    );
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(error.error.message || 'An unknnown error');
  }
}
