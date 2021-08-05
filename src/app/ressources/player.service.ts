import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {PlayerModel} from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private http: HttpClient) {
  }

  getPlayerById(id: string): Observable<PlayerModel> {
    return this.http.get<PlayerModel>(environment.baseApiUrl + 'player/' + id);
  }

  createPlayer(player: any) {
    return this.http.post<any>(environment.baseApiUrl + 'player', player);
  }

  updatePlayerScore(data: any) {
    return this.http.post<any>(environment.baseApiUrl + 'player/score', data);
  }

  deletePlayers() {
    const option = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.delete(environment.baseApiUrl + 'players', option);
  }
}

