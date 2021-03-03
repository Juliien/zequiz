import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const options = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

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
      })
    }
  }

  getUserById(): Observable<UserModel> {
    return this.http.get<UserModel>(environment.baseApiUrl + 'user', options);
  }

  updateScore(score: number, opponentScore: number): Observable<any> {
    return this.http.post<any>(environment.baseApiUrl + 'update/score',{score: score, opponentScore: opponentScore}, options);
  }
}
