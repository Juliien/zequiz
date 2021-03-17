import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(info: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };
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
