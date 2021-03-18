import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RoomModel } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) {}

  getRoomById(id: string): Observable <RoomModel> {
    return this.http.get<RoomModel>(environment.baseApiUrl + 'room/' + id);
  }

  createRoom(room: any) {
    return this.http.post<any>(environment.baseApiUrl + 'room', room);
  }

  joinRoom(data: any) {
    return this.http.post<any>(environment.baseApiUrl + 'room/join', data);
  }

  quitRoom(data: any) {
    return this.http.post<any>(environment.baseApiUrl + 'room/quit', data);
  }

  closeRoom(id: string) {
    return this.http.post<any>(environment.baseApiUrl + 'room/close/' + id, {});
  }

}
