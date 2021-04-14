import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CategoryModel} from '../models/category.model';


const options = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  insertCategory(category: any) {
    const option = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post<any>(environment.baseApiUrl + 'category', category, option);
  }

  getCategories(): Observable <any> {
    return this.http.get<any>(environment.baseApiUrl + 'categories', options);
  }

  getCategoryByID(id: string): Observable <any> {
    return this.http.get<any>(environment.baseApiUrl + 'category/' + id, options);
  }

  addView(category: CategoryModel) {
    return this.http.post<any>(environment.baseApiUrl + 'category/views', category, options);
  }

  addRate(rate: any) {
    return this.http.post<any>(environment.baseApiUrl + 'category/rate', rate, options);
  }

  getRatedCategories(): Observable <any> {
    return this.http.get<any>(environment.baseApiUrl + 'category/rate', options);
  }

  getViews(): Observable <any> {
    return this.http.get<any>(environment.baseApiUrl + 'category/most/viewed', options);
  }

  getNewCategories(): Observable <any> {
    return this.http.get<any>(environment.baseApiUrl + 'category/new', options);
  }
}
