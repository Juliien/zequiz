import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private http: HttpClient) { }

  quizSelect(category: number): Observable <any> {
    return this.http.get<any>(environment.baseQuizUrl + 'amount=10&category=' + category + '&type=boolean');
  }
}
