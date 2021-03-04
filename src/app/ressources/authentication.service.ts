import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {UserModel} from '../models/user.model';


const options = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  register(user: any): Observable<UserModel> {
    return this.http.post<UserModel>(environment.baseApiUrl  + 'register', user, options);
  }

  login(info: any): Observable<any> {
    return this.http.post<any>(environment.baseApiUrl  + 'login', info, options);
  }

  logout(): Observable<any> {
    const option = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post<any>(environment.baseApiUrl + 'logout', {}, option);
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');
    return token && token.length > 1;
  }
}
