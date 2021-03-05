import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  currentUser: UserModel;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {
    if (this.authenticationService.isLogged() && !this.currentUser) {
      this.getUserById().subscribe(user => {
        this.currentUser = user;
      }, (error) => {
        if(error.status === 401) {
          localStorage.clear();
        }
      })
    }
  }

  getUserById(): Observable<UserModel> {
    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get<UserModel>(environment.baseApiUrl + 'user', options);
  }

  getRanks(): Observable<UserModel[]> {
    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get<UserModel[]>(environment.baseApiUrl + 'ranks', options);
  }


  updateScore(score: number, opponentScore: number): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post<any>(environment.baseApiUrl + 'update/score',{score: score, opponentScore: opponentScore}, options);
  }
}
