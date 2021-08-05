import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: UserModel;

  constructor(private http: HttpClient) {
    if (this.isLogged() && !this.user) {
      this.getUserById().subscribe(user => {
        this.user = user;
      }, (error) => {
        if ( error.status === 401) {
          localStorage.clear();
        }
      });
    }
  }

  login(info: any): Observable<any> {
    return this.http.post<any>(environment.baseApiUrl  + 'login', info);
  }

  logout(): Observable<any> {
    const option = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post<any>(environment.baseApiUrl + 'logout', {}, option);
  }

  getUserById(): Observable<UserModel> {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get<UserModel>(environment.baseApiUrl + 'user', options);
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');
    return token && token.length > 1;
  }
}
