import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {QuizModel} from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getRoomById(id: string): Observable <any> {
    return this.http.get<any>(environment.baseApiUrl + 'room/' + id);
  }

  createRoom(quizId: string, quiz: QuizModel[]) {
    return this.http.post<any>(environment.baseApiUrl + 'room/' + quizId, {quiz});
  }

  joinRoom(id: string) {
    return this.http.post<any>(environment.baseApiUrl + 'room/join/' + id, {});
  }

  closeRoom(id: string) {
    return this.http.post<any>(environment.baseApiUrl + 'room/close/' + id, {});
  }

}
