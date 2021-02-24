import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getRoomById(id: string): Observable <any> {
    return this.http.get<any>(environment.baseApiUrl + 'room/' + id);
  }

  createRoom(quizId: string) {
    return this.http.post<any>(environment.baseApiUrl + 'room/' + quizId, {});
  }

  joinRoom(code: number) {
    return this.http.post<any>(environment.baseApiUrl + 'room/join/' + code, {});
  }

  closeRoom(id: string) {
    return this.http.post<any>(environment.baseApiUrl + 'room/close/' + id, {});
  }

}
