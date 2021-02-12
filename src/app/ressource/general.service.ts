import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  generalEasy(): Observable <any> {
    return this.http.get<any>(environment.baseUrl + 'amount=10&category=9&difficulty=easy&type=boolean');
}
  generalAny(): Observable <any> {
    return this.http.get<any>(environment.baseUrl + 'amount=10&category=9&type=boolean');
  }
  generalMedium(): Observable <any> {
    return this.http.get<any>(environment.baseUrl + 'amount=10&category=9&difficulty=medium&type=boolean');
  }
}
