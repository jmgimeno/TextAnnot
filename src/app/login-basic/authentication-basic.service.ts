import {Injectable} from '@angular/core';
import {User} from './user';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

@Injectable()
export class AuthenticationBasicService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<User> {
    const authorization = this.generateAuthorization(username, password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization
      })
    };
    return this.http.get(`${environment.API}/identity`, httpOptions).pipe(
      map(data => {
        const user: User = new User(data);
        user.authorization = authorization;
        user.password = password;
        return user;
      }),
      catchError((error: HttpErrorResponse) => new ErrorObservable(error))
    );
  }

  generateAuthorization(username: string, password: string): string {
    return `Basic ${btoa(`${username}:${password}`)}`;
  }

  storeCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser(): User {
    return new User(JSON.parse(localStorage.getItem('currentUser')));
  }

  isAdmin(): boolean {
    const user: User = this.getCurrentUser();
    return user.authorities[0].authority === 'ROLE_ADMIN';
  }
}
