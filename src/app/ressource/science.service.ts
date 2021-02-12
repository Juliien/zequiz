import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ScienceService {

  constructor(private http: HttpClient) { }

  scienceEasy() {
    return this.http.get(environment.baseUrl + 'amount=10&category=17&difficulty=easy&type=boolean');
  }
  scienceAny() {
    return this.http.get(environment.baseUrl + 'amount=10&category=17&type=boolean');
  }
  scienceMedium() {
    return this.http.get(environment.baseUrl + 'amount=10&category=17&difficulty=medium&type=boolean');
  }
}
