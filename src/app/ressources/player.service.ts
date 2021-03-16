import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


const options = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private http: HttpClient) { }

  getPlayerById(id: string): Observable <any> {
    return this.http.get<any>(environment.baseApiUrl + 'player/' + id, options);
  }
  createPlayer(player: any) {
    return this.http.post<any>(environment.baseApiUrl + 'player', player, options);
  }

  updateScore(id: string, score: number): Observable <any> {
    return this.http.post<any>(environment.baseApiUrl + 'player/score/' + id, {score}, options);
  }

  playerEndQuiz(id: string): Observable <any> {
    return this.http.post<any>(environment.baseApiUrl + 'player/end/' + id, {}, options);
  }
}
