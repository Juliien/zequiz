import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {PlayerModel} from '../models/player.model';


const options = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private http: HttpClient) {
  }

  getPlayerById(id: string): Observable<PlayerModel> {
    return this.http.get<PlayerModel>(environment.baseApiUrl + 'player/' + id, options);
  }

  createPlayer(player: any) {
    return this.http.post<any>(environment.baseApiUrl + 'player', player, options);
  }

  updatePlayerScore(data: any) {
    return this.http.post<any>(environment.baseApiUrl + 'player/score', data, options);
  }
}

