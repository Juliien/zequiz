import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private http: HttpClient) { }

  getPlayerById(id: string): Observable <any> {
    return this.http.get<any>(environment.baseApiUrl + 'player/' + id);
  }

  updateScore(id: string, score: number): Observable <any> {
    return this.http.post<any>(environment.baseApiUrl + 'player/score/' + id, {score});
  }
  playerEndQuiz(id: string): Observable <any> {
    return this.http.post<any>(environment.baseApiUrl + 'player/end/' + id, {});
  }
}
